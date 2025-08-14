import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        paddingTop: Constants.statusBarHeight + 20, // Added extra padding for safety
    },
    formContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    heading: {
        paddingTop: 20,
        fontSize: 32,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 32,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        width: width - 48,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#1a1a1a',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        width: width - 48,
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    socialButton: {
        width: width - 48,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    socialButtonText: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: width - 48,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    dividerText: {
        color: '#666666',
        marginHorizontal: 16,
        fontSize: 14,
    },
    footerText: {
        marginTop: 24,
        fontSize: 14,
        color: '#666666',
    },
    linkText: {
        color: '#007AFF',
        fontWeight: '600',
    }
});

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //const signupTriggered = () => {

    //}

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <ThemedText style={styles.heading}>Create Account</ThemedText>
                <ThemedText style={styles.subheading}>
                    Enter your details to get started
                </ThemedText>

                <TextInput
                    id="name"
                    value={name}
                    onChangeText={setName}
                    placeholder="Full Name"
                    placeholderTextColor="#999999"
                    style={styles.input}
                    autoCapitalize="words"
                />
                <TextInput
                    id="email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email Address"
                    placeholderTextColor="#999999"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    id="password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#999999"
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    id="confirm_password"
                    placeholder="Confirm Password"
                    placeholderTextColor="#999999"
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <ThemedText style={styles.footerText}>
                    Already have an account?{' '}
                    <Text style={styles.linkText}>Sign In</Text>
                </ThemedText>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => console.log('Google Sign In pressed')}>
                    <IconSymbol name="google" size={24} color="#DB4437" />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.socialButton, { backgroundColor: '#000000' }]}
                    onPress={() => console.log('Apple Sign In pressed')}>
                    <IconSymbol name="apple.logo" size={24} color="#FFFFFF" />
                    <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>Continue with Apple</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default SignUp;