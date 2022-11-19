import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "apollo-link-context"
import {BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const httpLink = new HttpLink({ uri: "http://localhost:4000" })
const authLink = setContext(async (req, { headers }) => {
	const token = localStorage.getItem("token")

	return {
		...headers,
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
	link: link as any,
	cache: new InMemoryCache()
})
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
         <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);


