import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8080/api",
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ApolloProvider client={client}>
        <App client={client}/>
    </ApolloProvider>
);

