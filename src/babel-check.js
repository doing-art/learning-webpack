async function checkBabel() {
  return await Promise.resolve("Test");
}

checkBabel().then(console.log);

class Util {
  static id = 1;
}

console.log("Util.id", Util.id);
