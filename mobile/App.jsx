import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { analyticsApi, authApi, registerMobileDevice, session } from "./src/api";
import { getPlatformUsageStatus } from "./src/tracking";

const platform = Platform.OS === "ios" ? "ios" : "android";

export default function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { session.getToken().then(setToken).finally(() => setLoading(false)); }, []);
  useEffect(() => {
    if (!token) return;
    analyticsApi.features().then(setData).catch((err) => setError(err.message));
  }, [token]);

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await authApi.login(email, password);
      await session.save(result.token);
      await registerMobileDevice(platform);
      setToken(result.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !token) return <SafeAreaView style={styles.center}><ActivityIndicator color="#a78bfa" /></SafeAreaView>;
  if (!token) return <SafeAreaView style={styles.screen}><View style={styles.card}><Text style={styles.title}>ScreenSense AI</Text><Text style={styles.copy}>Sign in to access your wellbeing dashboard.</Text><TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#94a3b8" autoCapitalize="none" style={styles.input} /><TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#94a3b8" secureTextEntry style={styles.input} />{error ? <Text style={styles.error}>{error}</Text> : null}<Pressable style={styles.button} onPress={login}><Text style={styles.buttonText}>Sign in</Text></Pressable></View></SafeAreaView>;

  const minutes = data?.summary?.totalToday ?? 0;
  return <SafeAreaView style={styles.screen}><View style={styles.header}><Text style={styles.title}>ScreenSense AI</Text><Pressable onPress={async () => { await session.clear(); setToken(null); }}><Text style={styles.link}>Sign out</Text></Pressable></View>{error ? <Text style={styles.error}>{error}</Text> : null}<View style={styles.card}><Text style={styles.label}>Today’s screen time</Text><Text style={styles.metric}>{`${Math.floor(minutes / 60)}h ${minutes % 60}m`}</Text><Text style={styles.label}>Productivity score</Text><Text style={styles.metric}>{data ? `${data.summary.productivityScore}%` : "Loading…"}</Text></View><View style={styles.card}><Text style={styles.label}>Mobile tracker</Text><Text style={styles.copy}>{getPlatformUsageStatus(platform)}</Text></View></SafeAreaView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: "#060b17", padding: 24, gap: 18 }, center: { flex: 1, backgroundColor: "#060b17", alignItems: "center", justifyContent: "center" }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, card: { backgroundColor: "#101827", borderRadius: 18, padding: 20, gap: 10 }, title: { color: "#f8fafc", fontSize: 26, fontWeight: "700" }, copy: { color: "#94a3b8", fontSize: 15, lineHeight: 22 }, label: { color: "#94a3b8", fontSize: 13 }, metric: { color: "#f8fafc", fontSize: 30, fontWeight: "700", marginBottom: 8 }, input: { borderWidth: 1, borderColor: "#334155", borderRadius: 12, color: "#fff", padding: 14, marginTop: 12 }, button: { backgroundColor: "#7c3aed", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 12 }, buttonText: { color: "#fff", fontWeight: "700" }, error: { color: "#fca5a5" }, link: { color: "#c4b5fd", fontWeight: "600" } });
