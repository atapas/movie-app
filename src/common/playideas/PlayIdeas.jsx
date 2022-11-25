import { useState, useEffect } from "react";
import data from "./ideas.json";
import { IoAddSharp } from "react-icons/io5";
import { RiChatNewLine } from "react-icons/ri";
import LevelBadge from "common/components/LevelBadge";
import "./playIdeas.css";

const PlayIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filteredLevel, setFilteredLevel] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        // TODO: The idea list has to come from the DB
        //const response = await fetch('/api/ideas');
        //const json = await response.json();
        const json = data.ideas;
        setIdeas(json);
        setFilteredIdeas(json);
        setIsLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (filteredLevel === "") {
      setFilteredIdeas(data.ideas);
    } else {
      const filteredIdeas = ideas.filter(
        (idea) => idea.level === filteredLevel
      );
      setFilteredIdeas(filteredIdeas);
    }
  }, [filteredLevel, ideas]);

  if (isError) {
    return <div>Something went wrong ...</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const onValueChange = (event) => {
    setFilteredLevel(event.target.value);
  };

  return (
    <main className="app-body app-body-overflow-hidden">
      <div className="playideas-container">
        <div className="playideas-header">
          <div>
            <h1 className="header-title">
              Play Ideas
              <span className="header-title-badge">{filteredIdeas.length}</span>
            </h1>
            <p className="header-desc">
              Looking for project ideas to practice React? Great, you have landed on the right place. Here are some ideas to get you
              started.
            </p>
          </div>
          <div className="playideas-levels-pills">
            <div className="level-pill">
              <input
                type="radio"
                name="level"
                value=""
                id="all-id"
                className="level-pill-control"
                onChange={onValueChange}
                defaultChecked
              />
              <label htmlFor="all-id" className="level-pill-label">
                All
              </label>
            </div>
            <div className="level-pill">
              <input type="radio" name="level" value="Beginner" id="beginner-id" className="level-pill-control" onChange={onValueChange} />
              <label htmlFor="beginner-id" className="level-pill-label">
                BEGINNER
              </label>
            </div>
            <div className="level-pill">
              <input
                type="radio"
                name="level"
                value="Intermediate"
                id="intermediate-id"
                className="level-pill-control"
                onChange={onValueChange}
              />
              <label htmlFor="intermediate-id" className="level-pill-label">
                INTERMEDIATE
              </label>
            </div>
            <div className="level-pill">
              <input type="radio" name="level" value="Advanced" id="advanced-id" className="level-pill-control" onChange={onValueChange} />
              <label htmlFor="advanced-id" className="level-pill-label">
                ADVANCED
              </label>
            </div>
          </div>
        </div>
        <div className="playideas-body">
          <ul className="list-playideas">
            {filteredIdeas.map(idea => (
              <li className="list-playideas-item" key={idea.id}>
                <h2 className="idea-title">{idea.title}</h2>
                <p className="idea-desc">{idea.description}</p>
                <p className="idea-level">
                  <LevelBadge level={idea.level} />
                </p>
                <div className="idea-actions">
                  {process.env.NODE_ENV === 'development' ? (
                    <a href="/plays/create" rel="noopener noreferrer" className="btn-primary action-btn">
                      <IoAddSharp className="icon" />
                      <span className="btn-label">Create</span>
                      <span className="create-button-badge">beta</span>
                    </a>
                  ) : (
                    <a
                      href="https://github.com/reactplay/react-play/blob/main/CREATE-PLAY.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary action-btn"
                    >
                      <IoAddSharp className="icon" />
                      <span className="btn-label">Create</span>
                    </a>
                  )}
                  <a
                    href={`https://github.com/reactplay/react-play/discussions/new?category=ideas&title=${idea.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-default action-btn"
                  >
                    <RiChatNewLine className="icon" />
                    <span className="btn-label">Start discussion</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
};

export default PlayIdeas;
