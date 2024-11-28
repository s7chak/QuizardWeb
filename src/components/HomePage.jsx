import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaCog, FaBook } from "react-icons/fa";
import { FaInfo } from "react-icons/fa6";

const Container = styled.div`
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  position: relative;
  overflow-y: hidden;
  padding: 0;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const InputAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputArea = styled.textarea`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: #1c2438;
  border: 1px solid var(--background-secondary-alt);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 1px solid var(--lighter); /* Highlight bottom border */

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const AddLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0.5em;
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-light);
  background-color: #6200e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #6200fc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GearButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const SettingsPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-420px")};
  height: 100%;
  width: 400px;
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 1rem;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.5s ease;
  display: flex;
  flex-direction: column;
`;

const SettingsField = styled.div`
  margin-bottom: 1rem;
`;

const SettingsInput = styled.input`
  background-color: #121212;
  color: #ffffff;
  border: 1px solid #444444;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
`;

const SettingsLabel = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;

const TotalQuestions = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  color: #f39c12;
`;
const TextButton = styled.button`
  position: absolute;
  top: 60px;
  right: 15px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const InfoButton = styled.button`
  position: absolute;
  top: 100px;
  right: 15px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const TextPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 400px;
  height: 100%;
  background-color: rgba(40, 50, 70, 0.8);
  color: var(--text-primary);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.5s ease-in-out;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const InfoPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 400px;
  height: 100%;
  background-color: rgba(40, 50, 70, 0.8);
  color: var(--text-primary);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.5s ease-in-out;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  line-height: 1.5;
`;

const LoadingIndicator = styled.div`
  margin: auto;
  text-align: center;
  font-size: 1rem;
  color: var(--text-secondary);
`;
const envInfo = {
  local: { api: "http://localhost:1000" },
  prod: { api: "<API_URL>" },
};
const activeEnv = "local";

const HomePage = () => {
  const containerRef = useRef(null);
  const [textInput, setTextInput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [openAIKey, setOpenAIKey] = useState("");
  const [easyCount, setEasyCount] = useState(3);
  const [mediumCount, setMediumCount] = useState(5);
  const [difficultCount, setDifficultCount] = useState(2);
  const [quizName, setQuizName] = useState("");
  const totalQuestions = easyCount + mediumCount + difficultCount;
  const [isTextPanelOpen, setIsTextPanelOpen] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [absorbedText, setAbsorbedText] = useState("");
  const [infoText, setInfotext] = useState(
    "Paste links one line at a time into text area.\n\nReview them in the Text window.\n\nReview Settings window for number of questions.\n\nEnter your Open AI key.\n\nClick generate quiz for a customized quiz on the material."
  );

  const handleQuizGeneration = () => {
    console.log("Text Input:", textInput);
    alert("Quiz generation is not yet implemented!");
  };
  const handleAddLink = () => {
    setTextInput((prev) => "" + (prev ? "\n" + prev : ""));
  };

  const extractLinks = () => {
    return textInput
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link);
  };

  const handleTextView = async () => {
    setIsTextPanelOpen(true);
    setIsTextLoading(true);
    try {
      const response = await fetch(envInfo[activeEnv]["api"] + "/getText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          links: extractLinks(),
        }),
      });

      const data = await response.json();
      setAbsorbedText(data.text);
    } catch (error) {
      setAbsorbedText("No text found.");
      console.error(error);
    } finally {
      setIsTextLoading(false);
    }
  };

  const handleInfoView = async () => {
    setIsInfoPanelOpen(true);
  };

  const resetPanels = () => {
    setIsSettingsOpen(false);
    setIsTextPanelOpen(false);
    setIsInfoPanelOpen(false);
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      resetPanels();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <Header onClick={() => resetPanels()}>Quizard</Header>
      <GearButton onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <FaCog />
      </GearButton>
      <TextButton onClick={handleTextView}>
        <FaBook />
      </TextButton>
      <InfoButton onClick={handleInfoView}>
        <FaInfo />
      </InfoButton>
      <SettingsPanel isOpen={isSettingsOpen}>
        <TotalQuestions>Total Questions: {totalQuestions}</TotalQuestions>
        <SettingsField>
          <SettingsLabel>Open AI Key</SettingsLabel>
          <SettingsInput
            type="text"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        </SettingsField>
        <SettingsField>
          <SettingsLabel>Easy Question Count</SettingsLabel>
          <SettingsInput
            type="number"
            value={easyCount}
            onChange={(e) => setEasyCount(Number(e.target.value))}
          />
        </SettingsField>
        <SettingsField>
          <SettingsLabel>Medium Question Count</SettingsLabel>
          <SettingsInput
            type="number"
            value={mediumCount}
            onChange={(e) => setMediumCount(Number(e.target.value))}
          />
        </SettingsField>
        <SettingsField>
          <SettingsLabel>Difficult Question Count</SettingsLabel>
          <SettingsInput
            type="number"
            value={difficultCount}
            onChange={(e) => setDifficultCount(Number(e.target.value))}
          />
        </SettingsField>
        <SettingsField>
          <SettingsLabel>Quiz Name</SettingsLabel>
          <SettingsInput
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </SettingsField>
      </SettingsPanel>
      <TextPanel isOpen={isTextPanelOpen}>
        {isTextLoading ? (
          <LoadingIndicator>Loading...</LoadingIndicator>
        ) : (
          <TextContent>
            <h3>Text Material</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  absorbedText.replace(/\n/g, "<br />") ||
                  "No text loaded yet.",
              }}
            />
          </TextContent>
        )}
      </TextPanel>
      <InfoPanel isOpen={isInfoPanelOpen}>
        <TextContent>
          <h3>Instructions</h3>
          <div
            dangerouslySetInnerHTML={{
              __html:
                infoText.replace(/\n/g, "<br />") || "No text loaded yet.",
            }}
          />
        </TextContent>
      </InfoPanel>
      <InputAreaContainer>
        <InputRow>
          <InputArea
            placeholder="Enter text material as links (one per line)..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            as="textarea"
            rows={10}
          />
          <Button onClick={handleAddLink}>Add Link</Button>
        </InputRow>
      </InputAreaContainer>
      <Button onClick={handleQuizGeneration}>Generate Quiz</Button>
    </Container>
  );
};

export default HomePage;
