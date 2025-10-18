import { useTheme } from "@/hook";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const size = 170; 
const borderWidth = 15; 
const radius = size / 2;
const semicircularWidth = radius; 

export default function Timer({ value, total = 0, backgroundColor }: { value: number, total?: number, backgroundColor?: string }){
    const theme = useTheme();
    const bColor = backgroundColor ?? theme.colors.background;
    const [rotateIn, setRotateIn] = useState(0);
    const [rotateOut, setRotateOut] = useState(0);
    const [colorIn] = useState(theme.colors.onBackground);
    const [colorOut, setColorOut] = useState(bColor);
    const styles = StyleSheet.create({
        container: {
            position: "relative",
            overflow: "hidden",
            width: size,
            height: size,
            
            justifyContent: "center",
            alignItems: "center",
            
            backgroundColor: bColor,
            borderWidth: 1,
            borderColor: theme.colors.onBackground,
            borderRadius: radius,
        },
        text: {
            fontSize: 60,
            fontWeight: "bold",
            color: theme.colors.onBackground,
            textAlign: "center"
        },
        textContainer: {
            height: size - borderWidth * 2,
            width: size - borderWidth * 2,
            
            justifyContent: "center",
            alignItems: "center",
            
            backgroundColor: bColor,
            borderRadius: radius,
        },
        innerCircle:{
            position: "absolute",
            
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        semiCircle: {
            position: "absolute",
            top: "50%",
            left: "50%",
            height: size,
            width: semicircularWidth,
            
            borderLeftWidth: 0,
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
        },
        semiCircleOut: {
            backgroundColor: colorOut,
            transform: [
                { translateY: -size / 2 },
                { translateX: -semicircularWidth / 2 },
                { rotate: `${rotateOut}deg` },
                { translateX: semicircularWidth / 2 }
            ],
        },
        semiCircleIn: {
            backgroundColor: colorIn,
            transform: [
                { translateY: -size / 2 },
                { translateX: -semicircularWidth / 2 },
                { rotate: `${rotateIn}deg` },
                { translateX: semicircularWidth / 2 }
            ],
        }
        
    });

    useEffect(() => {
        const rotate = value * 360 / total;
        setRotateIn(rotate);
        if(rotate >= 180){
            setRotateOut(180);
            setColorOut(theme.colors.onBackground);
        }else{
            setRotateOut(0);
            setColorOut(bColor);
        }
    }, [value, total, theme, bColor]);

    return(
        <View style={styles.container}>
            <View style={[ styles.semiCircle, styles.semiCircleIn ]} />
            <View style={[ styles.semiCircle, styles.semiCircleOut ]} />
            <View style={styles.innerCircle}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{value}</Text>
                </View>
            </View>
        </View>
    );
}