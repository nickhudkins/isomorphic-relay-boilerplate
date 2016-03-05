import React from 'react';

const PageView = ({ cssUri, data, jsUri, markup }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Isomorphic Relay • TodoMVC</title>
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

PageView.propTypes = {
  cssUri: React.PropTypes.string,
  data: React.PropTypes.array,
  jsUri: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string,
};

export default PageView;
