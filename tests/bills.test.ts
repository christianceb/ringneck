import Bills from "../src/Models/Bills";
import Bill from "../src/Entity/Bill";
import Frequency from "../src/Enums/Frequency";

describe("Bills model/entity test", () => {
  const mockBills:Bills = new Bills;

  beforeEach(() => {
    mockBills.clear();
    
    mockBills.store(new Bill(2357, new Date("2021-12-25"), Frequency.Fortnightly));
    mockBills.store(new Bill(1113, new Date("2021-12-31"), Frequency.Fortnightly));
  })

  it("Must have added at least one", () => {
    expect(mockBills.items.length).toBeGreaterThanOrEqual(1);
  });

  it("Auto-generated ids from a static value must be sequential", () => {
    expect(mockBills.items[0].id).toEqual(1);
    expect(mockBills.items[1].id).toEqual(2);

    mockBills.store(new Bill(1923, new Date("2021-12-25"), Frequency.Fortnightly, undefined, 789456123));
    mockBills.store(new Bill(2931, new Date("2021-12-25"), Frequency.Fortnightly));

    expect(mockBills.items[3].id).toEqual(789456124);
  });

  it("Find a bill with a specific Id", () => {
    mockBills.store(new Bill(1923, new Date("2021-12-25"), Frequency.Fortnightly, undefined, 789456123));
    
    const found = mockBills.find(789456123) as Bill;

    expect(found.amount).toEqual(1923);
  });
});