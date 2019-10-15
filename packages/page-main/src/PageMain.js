import { html, css, LitElement } from 'lit-element';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://countries.trevorblades.com'
});
const client = new ApolloClient({
  cache,
  link
});

export class PageMain extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        text-align: center;
      }

      svg {
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      logo: { type: Function },
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.title = 'Hello open-wc world!';
    this.logo = html``;
  }

  connectedCallback() {
    super.connectedCallback();

    this._requestUsers();
  }

  async _requestUsers() {
    const queryResult = await client.query({
      query: gql`
        query {
          countries {
            name
          }
        }
      `
    });

    this.data = queryResult.data;
  }

  render() {
    return html`
      ${this.logo}
      <h1>${this.title}</h1>
      <p>Edit <code>src/MyApp.js</code> and save to reload.</p>
      <a
        class="app-link"
        href="https://open-wc.org/developing/#examples"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code examples
      </a>

      ${this.data && this.data.countries ? html`
        <ul>
          ${this.data.countries.map(country => html`
            <li>${country.name}</li>
          `)}
        </ul>
      ` : null}
    `;
  }
}
