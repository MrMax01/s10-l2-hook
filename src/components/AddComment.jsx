import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  // state = {
  //   comment: {
  //     comment: "",
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // };
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
        method: "POST",
        body: JSON.stringify(this.state.comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjkxOTEwYmNhMDAwMTQ1ODQwMTMiLCJpYXQiOjE2OTQ1MjExNzYsImV4cCI6MTY5NTczMDc3Nn0.oPZ7OVz3uItRM0hPyCeIPlohmLFj6cBXMwJotQ9_KP0",
        },
        body: { comment: comment, rate: rate, elementId: props.asin },
      });
      if (response.ok) {
        alert("Comment was sent!");
        setComment("");
        setRate(1);
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select" value={rate} onChange={(e) => setRate(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
