import { Icon } from "@rneui/themed";
import { color } from "@rneui/themed/dist/config";
import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Animated, ScrollView } from "react-native";
import { VictoryPie } from "victory-native";
import { CATEGORIES_LIST, PIE_COLORS, PIE_DATA } from "../common/Data";
// import { } from "victory-native"
export default function(){
    const [modeSelected,setMode] = useState("list");
    const [categoryView,setCatView] = useState("more");
    const [chartSelected,setChartSelect] = useState("Education")
    const catHeight = useRef(new Animated.Value(115)).current;
    function renderHeader(){
        return (
            <View style={{paddingHorizontal:10,flexDirection:"row",
            justifyContent:"space-between",alignItems:"center"}}>
                <Icon
                    name="arrow-back"
                    color="gray"
                    size={30}
                    type="ionicon"/>
                <Icon
                    name="ellipsis-horizontal"
                    color="gray"
                    size={30}
                    type="ionicon"
            />
            </View>
        )
    }

    function renderExpense(){
        return (
            <View style={{}}>
                <View style={{padding:10}}>
                <Text style={{fontSize:24,color:"#00A1C9",fontWeight:"bold"}}>My Expense </Text>
                    <Text style={{color:"gray"}}>Summary (private)</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
                    <View style={{width:40,height:40,backgroundColor:"#EEEEEE",borderRadius:20,justifyContent:"center"}}>
                        <Icon
                        name="calendar"
                        type="ionicon"
                        size={15}
                        color="gray"/>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:18,color:"#00A1C9",fontWeight:"bold"}}>07 Feb, 2022</Text>
                        <Text style={{fontSize:12,color:"gray"}}>18% more than last months</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderCategoryList({item}){
        const { id,icon,category,color} = item;
        return (
        <TouchableOpacity key={id} style={[styles.shadow,{
            backgroundColor:"white",padding:10,
            flex:1,
            margin:5,
            flexDirection:"row",
            alignItems:"center"}]}>
            <Icon
            name={icon}
            type="ionicon"
            size={25}
            color={color}/>
            <Text style={{paddingHorizontal:10}}>{category}</Text>
        </TouchableOpacity> )
    }

    function renderCategory(){
        return(
        <View >
            <View style={{alignItems:"center",flexDirection:"row",padding:10}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize:18,color:"#00A1C9",fontWeight:"bold"}}>CATEGORIES</Text>
                    <Text style={{fontSize:12,color:"gray",fontWeight:"bold"}}>7 total</Text>
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
                    <TouchableOpacity 
                    onPress={()=>setMode("chart")}
                    style={{width:50,height:50,justifyContent:"center",
                    backgroundColor: modeSelected === "chart" ? "tomato" : null,
                    borderRadius:25}}>
                        <Icon
                        name="pie-chart"
                        type="ionicon"
                        size={
                            20}
                        color={modeSelected === "chart" ? "white":"gray"}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>setMode("list")}
                    style={{width:50,height:50,justifyContent:"center",
                    backgroundColor:modeSelected === "list" ? "tomato":"white",borderRadius:25}}>
                        <Icon
                            name="list"
                            type="ionicon"
                            size={20}
                            color={modeSelected === "list" ? "white":"gray"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}>
            <Animated.View style={{height:catHeight}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={CATEGORIES_LIST}
                renderItem={(item)=>renderCategoryList(item)}
                keyExtractor={(item)=>item.id}
                numColumns={2}
                scrollEnabled={false}
                />
            </Animated.View>
            { categoryView === "less" &&
                <TouchableOpacity 
                    onPress={()=>{
                    setCatView("more");
                    Animated.timing(catHeight,
                    {toValue:115,
                    duration:300,
                    useNativeDriver:false}).start();
                    }}
                style={{ padding:10,
                justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
                    <Text> LESS </Text>
                    <Icon
                    name="chevron-up"
                    type="ionicon"
                    size={15}
                    color="gray"/>
                </TouchableOpacity>  }  

            { categoryView === "more" &&
                <TouchableOpacity 
                onPress={()=>{setCatView("less");
                setCatView("less");
                    Animated.timing(catHeight,
                    {toValue:175,
                    duration:300,
                    useNativeDriver:false}).start();                
                }
                
                }
                style={{ padding:10,
                justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
                    <Text> MORE </Text>
                    <Icon
                    name="chevron-down"
                    type="ionicon"
                    size={15}
                    color="gray"/>
                </TouchableOpacity> } 

                <VictoryPie
                    data={PIE_DATA}
                    labels={({datum})=> `${datum.y} %`}
                    colorScale={PIE_COLORS}
                    radius={({datum})=> (datum.type === chartSelected ) ? 160 : 150}
                    innerRadius={75}
                    labelRadius={110}
                    style={{
                        labels:{
                            fill:"white",
                            fontWeight:"bold"
                        }
                    }}
                    events={
                        [{
                            target: "data",
                            eventHandlers: {
                                onPress: ()=>{                                    
                                    return [
                                        {
                                            target: "data",
                                            mutation: ({ style,datum }) => {
                                                setChartSelect(datum.type);
                                            }
                                        }
                                    ]
                                }
                            }
                        }]
                    }
                    />
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                {
                    PIE_DATA.map((item,index)=>{
                        return(
                            <View style={{ backgroundColor: chartSelected === item.type ? item.color : null,
                                width:"80%", borderRadius:10,
                                flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20,paddingVertical:5}}>                                
                                <View>
                                <Text style={{color: chartSelected === item.type ? "white" : null}}>{item.type}</Text>
                                </View>
                                <View>
                                <Text style={{color: chartSelected === item.type ? "white" : null,textAlign:"right"}}>{item.amount} - {item.y}% </Text>
                                </View>
                            </View>
                        )
                    })
                }
                </View>
                </ScrollView>     
                </View>     
        </View> )
    }

    return (
        <View>
            {renderHeader()}
            {renderExpense()}
            {renderCategory()}
        </View>
        )
}

const styles = StyleSheet.create({
    shadow: {
        elevation:10,
        shadowRadius:3,
        shadowOffset:{width:1,height:1},
        shadowColor:"gray",
        shadowOpacity: 0.3
    },
  });