import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_POST } from "../utils/mutations";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "../utils/images";

export default function NewPostModal({ show, setShow }) {
  const [error, setError] = useState(undefined);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageInputFile, setImageInputFile] = useState(undefined);

  const [createPost, { createPostError }] = useMutation(CREATE_POST);

  const [formData, setFormData] = useState({
    postingAs: "me",
    content: "",
    photoUrl: undefined,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(userProfile);

    let photoUrl = undefined;
    if (imageInputFile) {
      try {
        setUploadingImage(true);
        photoUrl = await uploadImage(imageInputFile);
        setUploadingImage(false);
      } catch (error) {
        setUploadingImage(false);
        setError(
          new Error(
            "An error occured while uploading your image: " + error.message
          )
        );
      }
    }

    const createdPost = await createPost({
      variables: {
        post: {
          ...formData,
          photoUrl,
        },
      },
    });
  }

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Post as</Form.Label>
              <Form.Control
                as="select"
                value={formData.postingAs}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    posttingAs: event.target.value,
                  })
                }
              >
                <option value="me">Yourself (Cole)</option>
                <option value="jack">Jack</option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    content: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlFile1" className="mb-3">
              <Form.Label>Include a Photo!</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg"
                capture="environment"
                multiple={false}
                onChange={(event) => setImageInputFile(event.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* photo upload modal */}
      <Modal show={uploadingImage}>
        <Modal.Header>
          <Modal.Title>Uploading Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <img
            src="https://i.pinimg.com/originals/00/94/18/009418460183d05cbbff41179436b3eb.gif"
            alt="loading gears"
          />
        </Modal.Body>
      </Modal>

      {/* error modal */}
      <Modal show={error} centered>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {error ? error.message : "An error occured. Please try again!"}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setError(undefined)}>Whoops!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
