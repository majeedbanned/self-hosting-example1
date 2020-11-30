import React from "react";
import { Text, StyleSheet, View, Button,ScrollView } from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";


const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
      <Button onPress={() => navigation.navigate("selectuser")} title="selectuser" />

      <Button onPress={() => navigation.navigate("test")} title="test" />

     
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
      <Button onPress={() => navigation.navigate("Main")} title="main" />
     
      <Button onPress={() => navigation.navigate("sheet")} title="sheet" />


      <Button
        onPress={() => navigation.navigate("Textscr")}

        title="go to text screen1f"
      />

<Button
        onPress={() => navigation.navigate("SearchScreen")}

        title="go to SearchScreen"
      />

<Button onPress={() => navigation.navigate("Craigslist")} title="glist" />
<Button onPress={() => navigation.navigate("FlatListGrid")} title="grid"/>
<Button onPress={() => navigation.navigate("Mainmenu")} title="Main menu1"/>
<Button onPress={() => navigation.navigate("scrollabletab")} title="scrollabletab"/>
<Button onPress={() => navigation.navigate("FacebookExample")} title="FacebookExample"/>
<Button onPress={() => navigation.navigate("paparButtomNavigator")} title="paparButtomNavigator"/>
<Button onPress={() => navigation.navigate("qrscanner")} title="qrscanner"/>
{/* <Button onPress={() => navigation.navigate("galio")} title="galio"/> */}
<Button onPress={() => navigation.navigate("stickytable")} title="stickytable"/>

<Button onPress={() => navigation.navigate("persiancalendarpicker")} title="persiancalendarpicker"/>
<Button onPress={() => navigation.navigate("timeline")} title="timeline"/>

<Button onPress={() => navigation.navigate("fixedtable")} title="fixedtable"/>
<Button onPress={() => navigation.navigate("flatgrid")} title="flatgrid"/>
<Button onPress={() => navigation.navigate("flatgridSection")} title="flatgridSection"/>
<Button onPress={() => navigation.navigate("lottie")} title="lottie"/>
<Button onPress={() => navigation.navigate("swipper")} title="swipper"/>
<Button onPress={() => navigation.navigate("recyclerViewList1")} title="recyclerViewList1"/>
<Button onPress={() => navigation.navigate("reactnativesnapcarousel")} title="reactnativesnapcarousel"/>
<Button onPress={() => navigation.navigate("ultimatelistview")} title="ultimatelistview"/>

<Button onPress={() => navigation.navigate("modal")} title="modal"/>
<Button onPress={() => navigation.navigate("timetable")} title="timetable"/>
<Button onPress={() => navigation.navigate("formik")} title="formik"/>
<Button onPress={() => navigation.navigate("tcombform")} title="tcombform"/>
<Button onPress={() => navigation.navigate("segmentedTab")} title="segmentedTab"/>
<Button onPress={() => navigation.navigate("sexytab")} title="sexytab"/>


<Button onPress={() => navigation.navigate("hookform")} title="hookform"/>

<Button
          onPress={() => {
            /* HERE WE GONE SHOW OUR FIRST MESSAGE */
            showMessage({
              message: "Simple message",
              type: "info",
            });
          }}
          title="Request Details"
          color="#841584"
        />

</ScrollView>
        
      
<FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
