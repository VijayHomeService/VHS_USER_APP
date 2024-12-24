const livingRoom = [
  {
    id: 1,
    name: 'Table',
    itemList: [
      {itemId: 'tb1', itemName: 'Center Table'},
      {itemId: 'tb2', itemName: 'Dinnig Table'},
      {itemId: 'tb3', itemName: 'Teapoy'},
    ],
  },
  {
    id: 2,
    name: 'Chairs',
    itemList: [
      {itemId: 'ch1', itemName: 'Plastic/Folding Chair'},
      {itemId: 'ch2', itemName: 'Dining Table Chairs'},
    ],
  },
  {
    id: 3,
    name: 'TV/Monitor',
    itemList: [
      {itemId: 'tv1', itemName: `Upto 28"`},
      {itemId: 'tv2', itemName: `29" to 43"`},
      {itemId: 'tv3', itemName: `49" to 55"`},
      {itemId: 'tv4', itemName: `Above 55"`},
      {itemId: 'tv5', itemName: 'Home Theater'},
    ],
  },
  {
    id: 4,
    name: 'Cabinet/Storage',
    itemList: [
      {itemId: 'cs1', itemName: 'TV Stand/Trolley'},
      {itemId: 'cs2', itemName: 'Shoe Rack'},
      {itemId: 'cs3', itemName: 'Bar Unit'},
    ],
  },
  {
    id: 5,
    name: 'Sofa',
    itemList: [
      {itemId: 'sf1', itemName: 'Single'},
      {itemId: 'sf2', itemName: 'Double'},
      {itemId: 'sf3', itemName: '3 Seater'},
      {itemId: 'sf4', itemName: '4 Seater'},
      {itemId: 'sf5', itemName: '5 Seater'},
      {itemId: 'sf6', itemName: '6 Seater'},
      {itemId: 'sf7', itemName: 'Recliner'},
    ],
  },
  {
    id: 6,
    name: 'Home Utility',
    itemList: [
      {itemId: 'hu1', itemName: 'Decorative Item'},
      {itemId: 'hu2', itemName: 'Lamp'},
    ],
  },
];

const bedRoom = [
  {
    id: 1,
    name: 'Tables',
    itemList: [
      {itemId: 'btb1', itemName: 'Study/Computer Table'},
      {itemId: 'btb2', itemName: 'Bed Side Table'},
    ],
  },
  {
    id: 2,
    name: 'Chairs',
    itemList: [
      {itemId: 'bch1', itemName: 'Office Chair'},
      {itemId: 'bch2', itemName: 'Rocking Chair'},
    ],
  },
  {
    id: 3,
    name: 'Mattress',
    itemList: [
      {itemId: 'bmt1', itemName: 'Single Mattress Foldable'},
      {itemId: 'bmt2', itemName: 'Single Mattress Non Foldable'},
      {itemId: 'bmt3', itemName: 'Double Mattress Foldable'},
      {itemId: 'bmt4', itemName: 'Double Mattress Non Foldable'},
    ],
  },
  {
    id: 4,
    name: 'Cabinet/Storage',
    itemList: [
      {itemId: 'bcs1', itemName: 'Dressing Table'},
      {itemId: 'bcs2', itemName: 'Book Shelf'},
      {itemId: 'bcs3', itemName: 'Mandir(Big)'},
      {itemId: 'bcs4', itemName: 'Iron Truck/Chest'},
    ],
  },
  {
    id: 5,
    name: 'Bed Frame',
    itemList: [
      {itemId: 'bbf1', itemName: 'Single Bed Dismantlable'},
      {itemId: 'bbf2', itemName: 'Single Bed Storage/Hydraulic'},
      {itemId: 'bbf3', itemName: 'Double Bed Dismantlable'},
      {itemId: 'bbf4', itemName: 'Double Bed Storage/Hydraulic'},
      {itemId: 'bbf5', itemName: 'Bunk Dismantlable'},
      {itemId: 'bbf6', itemName: 'Bunk Bed Non Dismantlable'},
      {itemId: 'bbf7', itemName: 'Folding Cot Dismantlable'},
    ],
  },
  {
    id: 6,
    name: 'AC/Cooler/Fan',
    itemList: [
      {itemId: 'bac1', itemName: 'AC(Split)'},
      {itemId: 'bac2', itemName: 'AC(Window)'},
      {itemId: 'bac3', itemName: 'Cooler'},
      {itemId: 'bac4', itemName: 'Ceiling Fan'},
      {itemId: 'bac5', itemName: 'Table Fan'},
    ],
  },
  {
    id: 6,
    name: 'Almirah/Wardrobe',
    itemList: [
      {itemId: 'bal1', itemName: 'Small(0-3 feet wide) Wooden'},
      {itemId: 'bal2', itemName: 'Small(0-3 feet wide) Metal'},
      {itemId: 'bal3', itemName: 'Small(0-3 feet wide) Dismantlable'},
      {itemId: 'bal4', itemName: 'Medium(3-6 feet wide) Wooden'},
      {itemId: 'bal5', itemName: 'Medium(3-6 feet wide) Metal'},
      {itemId: 'bal6', itemName: 'Medium(3-6 feet wide) Dismantlable'},
      {itemId: 'bal7', itemName: 'Big(3-6 feet wide) Wooden'},
      {itemId: 'bal8', itemName: 'Big(3-6 feet wide) Metal'},
      {itemId: 'bal9', itemName: 'Big(3-6 feet wide) Dismantlable'},
      {itemId: 'bal10', itemName: 'Chest of 3 Drawers'},
    ],
  },
];

const kitchen = [
  {
    id: 1,
    name: 'Fridge',
    itemList: [
      {itemId: 'fd1', itemName: 'Mini Fridge'},
      {itemId: 'fd2', itemName: 'Small - Upto 80 Ltrs'},
      {itemId: 'fd3', itemName: 'Medium - 80 to 300 Ltrs'},
      {itemId: 'fd4', itemName: 'Large 300-450 Ltrs'},
      {itemId: 'fd5', itemName: 'Large Above 450 Ltrs'},
    ],
  },
  {
    id: 2,
    name: 'Electrical/Gas Appliances',
    itemList: [
      {itemId: 'el1', itemName: 'Gas Stove'},
      {itemId: 'el2', itemName: 'Gas Cylinder'},
      {itemId: 'el3', itemName: 'Microwave/OTG'},
      {itemId: 'el4', itemName: 'Water purifier'},
      {itemId: 'el5', itemName: 'Dish Washer'},
      {itemId: 'el6', itemName: 'Exhaust Fan'},
      {itemId: 'el7', itemName: 'Chimney'},
    ],
  },
  {
    id: 3,
    name: 'Cabinet/Storage',
    itemList: [],
  },
];

const others = [
  {
    id: 1,
    name: 'Gunny Bag',
    itemList: [],
  },
  {
    id: 2,
    name: 'Bathroom Utility',
    itemList: [
      {itemId: 'br1', itemName: 'Washing Machine'},
      {itemId: 'br2', itemName: 'Bucket'},
      {itemId: 'br3', itemName: 'Tub'},
      {itemId: 'br4', itemName: 'Geyser'},
      {itemId: 'br5', itemName: 'Bath Tub'},
    ],
  },
  {
    id: 3,
    name: 'Vehicle',
    itemList: [
      {itemId: 'vh1', itemName: 'Bicycle'},
      {itemId: 'vh2', itemName: 'Scooter'},
      {itemId: 'vh3', itemName: 'Bike'},
    ],
  },
  {
    id: 4,
    name: 'Equipments/Instruments',
    itemList: [
      {itemId: 'ei1', itemName: 'Piano/Guitar'},
      {itemId: 'ei2', itemName: 'Treadmill/Exercise Cycle'},
      {itemId: 'ei3', itemName: 'Pool/Snooker'},
      {itemId: 'ei4', itemName: 'Foosball'},
    ],
  },
  {
    id: 5,
    name: 'Plant',
    itemList: [
      {itemId: 'pl1', itemName: 'Small(1 feet & above)'},
      {itemId: 'pl2', itemName: 'Medium(2 to 5 feet)'},
      {itemId: 'pl3', itemName: 'Large(6 feet & above)'},
    ],
  },
  {
    id: 6,
    name: 'Suitcase/Trolley',
    itemList: [
      {itemId: 'st1', itemName: 'Cabin/Small suitcase'},
      {itemId: 'st2', itemName: 'Medium(56 to 69 cm)'},
      {itemId: 'st3', itemName: 'Large(height above 70 cm)'},
    ],
  },
  {
    id: 6,
    name: 'Home Utility',
    itemList: [
      {itemId: 'hu1', itemName: 'Inverter/UPS'},
      {itemId: 'hu2', itemName: 'Mirror(Large)'},
      {itemId: 'hu3', itemName: 'Dish Antenna'},
      {itemId: 'hu4', itemName: 'Water Drum'},
      {itemId: 'hu5', itemName: 'Sewing Machine'},
      {itemId: 'hu6', itemName: 'Vaccum Cleaner'},
      {itemId: 'hu7', itemName: 'Ladder'},
      {itemId: 'hu8', itemName: 'Iron Board'},
      {itemId: 'hu9', itemName: 'Bean bag/Baby Chair'},
    ],
  },
];

export {livingRoom, bedRoom, kitchen, others};
