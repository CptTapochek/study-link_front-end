import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://18.158.228.96:3000/api",
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ApolloProvider client={client}>
        <App client={client}/>
    </ApolloProvider>
);

