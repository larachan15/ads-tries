class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}

class Trie {
  constructor(words, buildCode, Node = TrieNode) {
    this.Node = Node;
    this.buildCode = buildCode;
    this._root = new this.Node();
    this._count = 0;
    words.forEach(word => this.addWord(word));
  }

  addWord(word) {
    const code = this.buildCode(word);
    let node = this._root;

    for (let i = 0; i < code.length; i++) {
      let letter = code[i];
      let child = node.children[letter];

      if (child === undefined){
        child = new TrieNode();
        node.children[letter] = child;
      }
      node = child;
    }

    if (!node.words.includes(word)) {
       node.words.push(word);
       this._count += 1;
    }
  }

  lookupCode(code) {
    let node = this._root;

    for (let i = 0; i < code.length; i++){
      let letter = code[i];
      node = node.children[letter];

      if (node === undefined){
        return [];
      }
    }
    return node.words;
  }

  findAllWords(node, results = []) {
    node.words.forEach((word) => {
      results.push(word);
    });

    Object.keys(node.children).forEach((key) => {
      this.findAllWords(node.children[key], results);
    });

    return results;
  }

  lookupPrefix(codePrefix) {
    let node = this._root;

    for (let i = 0; i < codePrefix.length; i++){
      let letter = codePrefix[i].toLowerCase();

      node = node.children[letter];

      if (node === undefined){
        return [];
      }
    }
    let result = this.findAllWords(node);

    return result;
  }

  count() {
    return this._count;
  }
}

export default Trie;
