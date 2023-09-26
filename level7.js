class Player {
  constructor() {
    this.health = 20;
    this.currentHealth = 20;
    this.maxHp = 20;
    this.attack = 5;
    this.position = 2;
    this.backRecorrido = false;
    this.direction = 'backward';
    this.curado = true;
  }

  fullHealth(warrior) {
    return warrior.health() === this.health;
  }

  takingDamage(warrior) {
    return warrior.health() < this.currentHealth;
  }

  attackOrRescue(warrior) {
    
    return warrior.feel(this.direction).getUnit()
      ? warrior.attack(this.direction)
      : warrior.rescue(this.direction);
  }

  wallHasReached(warrior) {
    return warrior.feel().isWall(this.direction);
  }

  changeDirection(warrior){
    
    if (this.curado){
      warrior.pivot();
      this.curado = false;
      this.setDirection(warrior);
    }
  }

  setDirection(warrior){
    this.direction = (this.direction === 'forward') ? 'backward' : 'forward';
  }

  walkOrRest(warrior) {
  return this.fullHealth(warrior)
    ? this.walkOrEscape(warrior)
    : this.restingOrContinue(warrior);
  }

  restingOrContinue(warrior){
    return this.tocado(warrior)
    ? this.resting(warrior)
    : warrior.walk(this.direction) ;
  }

  resting (warrior){
    warrior.rest()
    if (warrior.fullHealth){
      this.curado = true;
    }
  }

  walkOrEscape(warrior){

    return this.tocado(warrior) && this.curado
    ? this.changeDirection(warrior)
    : warrior.walk(this.direction);
  }

  tocado(warrior){
    return warrior.health() < this.maxHp * 50 / 100
  }

  casiMuerto (warrior){
    return warrior.health() < this.maxHp * 25 / 100
  }

  siendoAtacado (warrior){
    return this.takingDamage(warrior)
    ? warrior.walk('backward')
    : this.resting(warrior);
  }

  playTurn(warrior) {


    if (this.wallHasReached(warrior)) {
      this.changeDirection(warrior);
    } else if(!this.fullHealth(warrior) && (!this.takingDamage(warrior))){
      this.resting(warrior);
    } else if (warrior.feel(this.direction).isEmpty() && this.tocado(warrior)) {
      this.siendoAtacado(warrior);
    } else if (warrior.feel(this.direction).isEmpty()) {
      this.walkOrRest(warrior);
    } else {
      this.attackOrRescue(warrior);
    }
    this.currentHealth = warrior.health();
  }
}
