import { Switch, Route } from "wouter";
import LandingPage from "@/pages/LandingPage";
import RecognitionPage from "@/pages/RecognitionPage";
import ChatWidget from "@/components/ChatWidget";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/recognition" component={RecognitionPage} />
      </Switch>
      <ChatWidget />
    </>
  );
}
