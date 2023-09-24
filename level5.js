class Player {
  constructor() {
    this.health = 20;
    this.currentHealth = 20;
    this.attack = 5;
  }

  fullHealth(warrior) {
    return warrior.health() === this.health;
  }

  takingDamage(warrior) {
    return warrior.health() < this.currentHealth;
  }

  walkOrRest(warrior) {
    return this.takingDamage(warrior) || this.fullHealth(warrior)
      ? warrior.walk()
      : warrior.rest();
  }

  attackOrRescue(warrior){
    return warrior.feel().getUnit().isEnemy() 
    ? warrior.attack()
    : warrior.rescue();
  }

  playTurn(warrior) {
    warrior.feel().isEmpty()
      ? this.walkOrRest(warrior)
      : this.attackOrRescue(warrior)

    this.currentHealth = warrior.health();
  }
}
