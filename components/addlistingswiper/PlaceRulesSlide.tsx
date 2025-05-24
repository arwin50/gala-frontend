import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  PlaceRulesSlideProps,
  SetRulesState,
  ToggleRulesState,
} from "../../interfaces";

// Define mock rules data
const rules = [
  { name: "Check-in time", type: "set" },
  { name: "Checkout time", type: "set" },
  { name: "Pets allowed", type: "toggle" },
  { name: "Events allowed", type: "toggle" },
  { name: "Smoking allowed", type: "toggle" },
  { name: "Quiet hours", type: "set" },
  { name: "Number of guests", type: "set" },
  { name: "Additional Rules", type: "add" },
];

export default function PlaceRulesSlide({
  toggleRules,
  setToggleRules,
  setRuleValues,
  setSetRuleValues,
  additionalRules,
  setAdditionalRules,
}: PlaceRulesSlideProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRule, setNewRule] = useState("");

  // Handlers for different rule types
  const handleSet = (ruleName: string) => {
    if (ruleName === "Check-in time" || ruleName === "Checkout time") {
      Alert.prompt(
        `Set ${ruleName}`,
        "Enter time (e.g., 14:00):",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: (time) => {
              if (time) {
                const newSetRules: SetRulesState = {
                  ...setRuleValues,
                  [ruleName]: time,
                };
                setSetRuleValues(newSetRules);
              }
            },
          },
        ],
        "plain-text",
        setRuleValues[ruleName] || "" // Pre-fill if already set
      );
    } else if (ruleName === "Quiet hours") {
      Alert.prompt(
        "Set Quiet Hours",
        "Enter quiet hours (e.g., 22:00 - 07:00):",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: (hours) => {
              if (hours) {
                const newSetRules: SetRulesState = {
                  ...setRuleValues,
                  [ruleName]: hours,
                };
                setSetRuleValues(newSetRules);
              }
            },
          },
        ],
        "plain-text",
        setRuleValues[ruleName] || ""
      );
    } else if (ruleName === "Number of guests") {
      Alert.prompt(
        "Set Maximum Number of Guests",
        "Enter the maximum number of guests allowed:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: (number) => {
              if (number) {
                const newSetRules: SetRulesState = {
                  ...setRuleValues,
                  [ruleName]: number,
                };
                setSetRuleValues(newSetRules);
              }
            },
          },
        ],
        "plain-text",
        setRuleValues[ruleName] || ""
      );
    }
  };

  const handleToggle = (ruleName: string) => {
    const newToggleRules: ToggleRulesState = {
      ...toggleRules,
      [ruleName]: !toggleRules[ruleName],
    };
    setToggleRules(newToggleRules);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setAdditionalRules([...additionalRules, newRule.trim()]);
      setNewRule("");
    }
  };

  const handleDeleteRule = (index: number) => {
    setAdditionalRules(additionalRules.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1 m-8 mt-0">
      <Text className="text-3xl font-extrabold">Place Rules</Text>
      <Text className="mt-2 text-description">
        Place Rules help you define expectations for guests and protect your
        space. By setting clear rules, you ensure smoother stays and reduce the
        risk of misunderstandings.
      </Text>
      {/* Rules List */}
      <View className="mt-8 border border-line rounded-xl overflow-hidden">
        {rules.map((rule, index) => (
          <Pressable
            key={rule.name}
            onPress={
              rule.type === "set"
                ? () => handleSet(rule.name)
                : rule.type === "toggle"
                ? () => handleToggle(rule.name)
                : rule.type === "add"
                ? handleAdd
                : undefined
            }
            className={`flex-row justify-between items-center p-4 ${
              index < rules.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <Text className="text-base">{rule.name}</Text>
            {rule.type === "set" && (
              <Text className="text-base text-gray-600">
                {setRuleValues[rule.name] || "Set"}
              </Text>
            )}
            {rule.type === "toggle" && (
              <View className="flex-row items-center">
                <View
                  className={`w-5 h-5 rounded-full mr-2 ${
                    toggleRules[rule.name] ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <Text
                  className={`text-base font-semibold ${
                    toggleRules[rule.name] ? "text-gray-700" : "text-gray-500"
                  }`}
                >
                  {toggleRules[rule.name] ? "YES" : "NO"}
                </Text>
              </View>
            )}
            {rule.type === "add" && (
              <Text className="text-base text-gray-600">Add</Text>
            )}
          </Pressable>
        ))}
      </View>

      {/* Additional Rules Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-[80%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold">Additional Rules</Text>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>

            {/* Input Field */}
            <View className="flex-row items-center mb-4">
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg p-3 mr-2"
                placeholder="Enter new rule..."
                value={newRule}
                onChangeText={setNewRule}
                onSubmitEditing={handleAddRule}
              />
              <Pressable
                onPress={handleAddRule}
                className="bg-blue-500 p-3 rounded-lg"
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            </View>

            {/* Rules List */}
            <ScrollView className="flex-1">
              {additionalRules.map((rule, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
                >
                  <Text className="flex-1 text-base">{rule}</Text>
                  <Pressable
                    onPress={() => handleDeleteRule(index)}
                    className="ml-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
