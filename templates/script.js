module.exports = (components, services) => `
  ${
    services.map((item) => {
      return (
        `<div id='summary'>${item}</div>`
      );
    })
  }
  
  ${
    Object.keys(components).map((item) => {
      const client = components[item].client;
      return (
        `<script src="${client}.js"></script>`
      );
    })
  }
  <script>
    ${
      Object.keys(components).map((item) => {
        const idName = components[item].name;
        return (
          `
          const randomId = Math.floor(Math.random() * 10000000);
          ReactDOM.hydrate(React.createElement(${item}, { id: randomId }),document.getElementById('${idName}'));
          `
        );
      })
    }
  </script>
`;
