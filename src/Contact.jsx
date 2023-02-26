import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;

    .container {
      margin-top: 6rem;
      text-align: center;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    message: "",
  });
  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };
  // connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const { username, email, message } = userData;

    if (username && email && message) {
      const res = fetch(
        "https://academyforamerican-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email, 
            message,
          }),
        }
      );

      if (res) {
        setUserData({
          username: "",
          email: "",
          message: "",
        });
        alert("Data Stored");
      } else {
        alert("plz fill the data");
      }
    } else {
      alert("plz fill the data");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Feel Free to Contact us</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.4626283486427!2d75.58380331462644!3d31.346210562858612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5bf5a403173b%3A0x352d812a963bb245!2sAmerican%20Institute%20for%20IELTS%20and%20Spoken%20English!5e0!3m2!1sen!2sin!4v1677396759749!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>


      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xgedgjkr"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              required
              value={userData.username}
               onChange={postUserData}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              value={userData.email}
               onChange={postUserData}
            />

            <textarea
              name="message"
              cols="30"
              rows="6"
              autoComplete="off"
              required
              value={userData.message}
              onChange={postUserData}
              ></textarea>

            <input type="submit" value="send"   onClick={submitData}></input>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;