let os = require("os");
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
let { makeExecutableSchema } = require("graphql-tools");
let { importSchema } = require("graphql-import");
const db = require("./db.js");

let moment = require("moment");
let momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

let typeDefs = importSchema(`${__dirname}/schema.graphql`);

let resolvers = {
  Query: {
    system: () => {
      return {
        hello: "worldsys",
        hubname: db.hubname
      };
    },
    accessories(_, { offset, limit }) {
      console.log("offset:", offset, "limit:", limit);
      return db.accessories;
    }
  },
  Accessory: {
    __resolveType(obj, context, info) {
      return obj._type;
    }
  },
  System: {
    uptime() {
      return moment.duration(os.uptime(), "seconds").format("h [hrs], m [min]");
    },
    hello(obj) {
      return obj.hello + " from resolver";
    },
    uptimeDelayed() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new Date().toString());
        }, 3000);
      });
    }
  },
  Mutation: {
    setHubname(_, { name }) {
      db.hubname = name;
      return db.hubname;
    }
  }
};

let schema = makeExecutableSchema({ typeDefs, resolvers });

let corsOptions = {
  origin: "http://localhost:3000"
};

const PORT = process.env.PORT || 4001;

let app = express();
app.use(cors(corsOptions));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphiql`));
