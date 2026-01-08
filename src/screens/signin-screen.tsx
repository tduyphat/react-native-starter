import { FC } from "react"
import { Text, View } from "react-native";

interface ISignInScreen {
    navigation: any
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }: any) => {
    return (
        <View>
            <Text>Sign in</Text>
        </View>
    );
}
