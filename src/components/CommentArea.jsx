import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  //   isFirstLoad: true,
  // };
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjkxOTEwYmNhMDAwMTQ1ODQwMTMiLCJpYXQiOjE2OTQ1MjUxOTQsImV4cCI6MTY5NTczNDc5NH0.hfO7yvxSFx6roRnH_ZHWtx9ZKuRTNrcrdo-oVKNQHAw",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        // this.setState({ comments: comments, isLoading: false, isError: false, isFirstLoad: false });
        setComments(comments);
        setLoading(false);
        setError(false);
        setFirstLoad(false);
      } else {
        console.log("error");
        // this.setState({ isLoading: false, isError: true });
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      // this.setState({ isLoading: false, isError: true });
      setLoading(false);
      setError(true);
    }
  };

  // componentDidMount() {
  //   console.log("componentDidMount()");
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.fetchComments();
  //     console.log("siamo in componentDidUpdate e stiamo fetchando");
  //   } else {
  //     console.log("siamo in componentDidUpdate ma senza più fetch");
  //   }
  // }
  useEffect(() => {
    fetchComments();
  }, [props.asin]);

  return (
    <div className="text-center">
      <h2>CommentArea</h2>
      {isError && <Error />}
      <AddComment asin={props.asin} />
      {isLoading && <Loading />}

      {!isLoading && !isFirstLoad && comments.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>Non ci sono ancora commenti</ListGroup.Item>
        </ListGroup>
      ) : (
        <CommentList commentsToShow={comments} />
      )}
    </div>
  );
};

export default CommentArea;
