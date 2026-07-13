module.exports = function stubImportMeta() {
  return {
    visitor: {
      MetaProperty(path) {
        if (path.node.meta.name === 'import' && path.node.property.name === 'meta') {
          path.replaceWithSourceString('({ url: undefined, hot: undefined })');
        }
      }
    }
  };
};
