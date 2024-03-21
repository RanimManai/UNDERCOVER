import { useState } from "react";
function Footer() {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
    };

return (
  <div className="footer">
    <div className="footer-content">
      <button onClick={toggleRules}>
        Rules
      </button>
    </div>
    {showRules && (
      <div className="footer-content">
      <ul>
        Undercover is a game where players are either Civilians or Mr. White. 
        <br></br>Civilians aim to eliminate Mr. White, while Mr. White tries to survive or guess the Civilians' secret word.
        <li><b>Objective:</b>
        <ul> 
        <li>Civilians eliminate Mr. White.</li>
        <li>Mr. White survives or guesses the Civilians' word.</li>
        </ul>  
        </li>
        <li><b>Phases:</b></li>
        <ol>
        <li><i>Description:</i> Players describe their secret words.</li>
        <li><i>Discussion:</i> Players debate to identify Mr. White.</li>
        <li><i>Elimination:</i> Players vote to expel a player; Mr. White guesses the Civilians' word if eliminated.</li></ol>
        <li><b>Victory:</b> Civilians win by eliminating Mr. White; Mr. White wins by surviving or guessing the Civilians' word.</li>
        <li><b>The game continues until one side achieves victory.</b></li>
      </ul>
    </div>
    )}
  </div>
);
}

export default Footer
