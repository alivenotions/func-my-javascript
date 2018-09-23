class Container {
  constructor(x) {
    this.$value = x
  }

  static of(x) {
    return new Container(x)
  }

  map(fn) {
    return Container.of(fn(this.$value))
  }

  ap(otherContainer) {
    return otherContainer.map(this.$value)
  }
}

const add = x => y => x + y

console.log(Container.of(2).map(add).ap(Container.of(3)))
