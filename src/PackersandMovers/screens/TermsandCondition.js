import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.header}>Terms and Conditions</Text> */}

      <Text style={styles.subHeader}>Booking Details and Modifications</Text>

      <Text style={styles.sectionTitle}>1. Quotation and Changes:</Text>
      <Text style={styles.text}>
        • The provided quotation is based on the details provided by the
        customer, including the material list, movement date, and distance.
      </Text>
      <Text style={styles.text}>
        • If there are any deviations in the material list, movement date, or
        distance, a revised quotation will be offered based on the changes.
      </Text>
      <Text style={styles.text}>
        • For any revised quotation, the customer is expected to contact VHS
        customer care directly at 918453748478.
      </Text>

      <Text style={styles.sectionTitle}>2. Cancellation:</Text>
      <Text style={styles.text}>
        • Free cancellation is allowed up to 24 hours before the scheduled
        shifting slot.
      </Text>
      <Text style={styles.text}>
        • If the cancellation is made after this timeframe, the booking amount
        will be forfeited.
      </Text>

      <Text style={styles.sectionTitle}>
        3. Partner Assignment and Details:
      </Text>
      <Text style={styles.text}>
        • For advance bookings, the partner will be assigned roughly 24 hours
        before the scheduled shifting.
      </Text>
      <Text style={styles.text}>
        • The details of the partner will be shared 1 hour prior to the shifting
        time slot.
      </Text>

      <Text style={styles.sectionTitle}>4. Packing Material:</Text>
      <Text style={styles.text}>
        • The Partner has the right to collect all the packing material after
        the shifting is over.
      </Text>
      <Text style={styles.text}>
        • If you wish to retain any carton boxes, you can do so by paying Rs. 60
        per box.
      </Text>

      <Text style={styles.sectionTitle}>5. Price and Taxes:</Text>
      <Text style={styles.text}>
        • The price mentioned in the quotation is inclusive of any applicable
        taxes.
      </Text>
      <Text style={styles.text}>
        • Please note that the price is subject to change based on slot
        availability at the time of any modification.
      </Text>

      <Text style={styles.sectionTitle}>6. Warehousing:</Text>
      <Text style={styles.text}>
        • Warehousing facilities can be provided at an additional cost of Rs.
        300 per day, subject to availability.
      </Text>

      <Text style={styles.subHeader}>Payment Guidelines:</Text>

      <Text style={styles.sectionTitle}>
        1. Within City and Outstation Orders:
      </Text>
      <Text style={styles.text}>
        • The remaining amount should be paid to the Partner at the destination
        once the shifting is completed.
      </Text>

      <Text style={styles.sectionTitle}>2. Intercity Orders:</Text>
      <Text style={styles.text}>
        • 80% of the remaining amount, after the booking amount has been paid,
        should be paid at the time of packing and loading at the pickup
        location.
      </Text>
      <Text style={styles.text}>
        • The remaining 20% should be paid at the destination before unloading
        on the date of delivery.
      </Text>

      <Text style={styles.subHeader}>Goods and Items Details:</Text>

      <Text style={styles.sectionTitle}>1. Packaging:</Text>
      <Text style={styles.text}>
        • Electronic items, furniture, and fragile goods must be packed using
        multi-layer packaging for added protection. We highly recommend
        customers opt for this option.
      </Text>
      <Text style={styles.text}>
        • Any damages occurring to goods that were not packaged or had
        single-layer packaging are not the responsibility of VHS, either
        partially or in full.
      </Text>

      <Text style={styles.sectionTitle}>2. Refrigerators:</Text>
      <Text style={styles.text}>
        • Prior to packing, refrigerators must be defrosted at least 24 hours in
        advance to prevent water seepage during transportation.
      </Text>

      <Text style={styles.sectionTitle}>3. Restricted Items:</Text>
      <Text style={styles.text}>
        • The following goods are not acceptable for movement: jewelry, arms and
        ammunition, hazardous materials such as crackers, explosives, chemicals,
        battery acids, inflammable oils (e.g., diesel, petrol, kerosene,
        gasoline), narcotics, and counterfeit items.
      </Text>
      <Text style={styles.text}>
        • Please keep all valuable items like cash and jewelry under your
        custody before the shifting process begins.
      </Text>

      <Text style={styles.sectionTitle}>4. Technical Assistance:</Text>
      <Text style={styles.text}>
        • If any machines, appliances, or electronic gadgets require the
        technical assistance of the manufacturer or their authorized dealer for
        locking/unlocking, it is the customer's responsibility to arrange for
        this assistance.
      </Text>

      <Text style={styles.sectionTitle}>
        5. AC Uninstallation and Installation:
      </Text>
      <Text style={styles.text}>
        • Charges for AC uninstallation and installation cover only the service,
        and materials need to be purchased separately, which are not included in
        the quote.
      </Text>
      <Text style={styles.text}>
        • Assembling does not include pipes, gas filling, extra wires, fittings,
        etc. These additional charges should be borne by the customer.
      </Text>
      <Text style={styles.text}>
        • VHS does not assume responsibility for any damage to copper pipes
        during assembling and dismantling.
      </Text>

      <Text style={styles.sectionTitle}>6. Vehicle Movement:</Text>
      <Text style={styles.text}>
        • For the movement of two-wheelers or four-wheelers, the fuel tank
        should be completely emptied.
      </Text>
      <Text style={styles.text}>
        • Customers are requested not to hand over any accessories such as
        helmets or jackets along with the two-wheeler. Claims regarding such
        accessories will not be entertained.
      </Text>
      <Text style={styles.text}>
        • Please provide a copy of the RC book, insurance, and pollution
        certificate for two-wheeler movement.
      </Text>

      <Text style={styles.subHeader}>Important Information:</Text>

      <Text style={styles.sectionTitle}>1. Delays and Restricted Entry:</Text>
      <Text style={styles.text}>
        • Due to No Entry Hours in specific cities, restricted movement,
        festival days, or peak days, there might be delays in the arrival of the
        vehicle.
      </Text>
      <Text style={styles.text}>
        • It is essential to be aware of the timings during which external
        vehicles are allowed inside the premises. Some societies have shifting
        restrictions in the morning, evening, or on Sundays. Please check with
        the society before the shifting date.
      </Text>
      <Text style={styles.text}>
        • If any permissions are required, the customer should take them in
        advance from the Resident Welfare Association.
      </Text>

      <Text style={styles.sectionTitle}>2. Goods Transfer via Ropes:</Text>
      <Text style={styles.text}>
        • If there is a need to transfer goods using ropes, the decision to
        proceed with this method lies solely with the customer subject to
        availability.
      </Text>
      <Text style={styles.text}>
        • VHS will not be responsible for any damage to the goods in such cases.
      </Text>

      <Text style={styles.sectionTitle}>3. Internal Damages and Packing:</Text>
      <Text style={styles.text}>
        • VHS does not cover for any internal damages.
      </Text>
      <Text style={styles.text}>
        • Damages to goods not packed by VHS's crew are not covered by VHS.
      </Text>
      <Text style={styles.text}>
        • Any other damage during the shifting process must be reported to VHS
        Customer Care within 24 hours of shifting completion. No cases or claims
        will be entertained if not reported within this timeframe.
      </Text>

      <Text style={styles.sectionTitle}>4. Disputes and Changes:</Text>
      <Text style={styles.text}>
        • VHS will not entertain disputes regarding aspects that are not
        included in the quote and were not officially communicated to the VHS
        Support team when changes were made. It is important to get the quote
        updated accordingly.
      </Text>

      <Text style={styles.sectionTitle}>
        5. Vehicle Type and Delivery Time:
      </Text>
      <Text style={styles.text}>
        • The vehicle type sent to customers on the shifting date is dependent
        solely on the Partner.
      </Text>
      <Text style={styles.text}>
        • For intercity orders, the delivery time will vary depending on the
        route and the type of service (Full Truck Load or Part Truck Load).
        Customers are requested to refer to the Delivery Time with the booking
        representative at the time of booking.
      </Text>
      <Text style={[styles.text, {marginBottom: 20}]}>
        • Please note that there might be a deviation of up to 2 days from the
        expected delivery date.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  text: {
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});

export default TermsAndConditions;
