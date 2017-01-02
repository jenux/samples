export class FIELDUPDATED {
  constructor(public page, public field) {}
}

export class FIELDADDED {
  constructor(public page, public field) {}
}

export class FIELDTOEDIT {
  constructor(public field) {}
}

export class FIELDREMOVED {
  constructor(public page, public field) {}
}

export class PAGEADDED {
  constructor(public page) {}
}

export class PAGEREMOVED {
  constructor(public page) {}
}

