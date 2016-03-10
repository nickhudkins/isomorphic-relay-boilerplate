import React from 'react';

const Page = ({ cssUri, data, jsUri, markup }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Isomorphic Relay • TodoMVC</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {cssUri && <link rel="stylesheet" href={cssUri} />}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
      <script
        id="preloadedData"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/\//g, '\\/') }}
      ></script>
      <script src={jsUri}></script>
    </body>
  </html>
);

Page.propTypes = {
  cssUri: React.PropTypes.string,
  data: React.PropTypes.array,
  jsUri: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string,
};

export default Page;
