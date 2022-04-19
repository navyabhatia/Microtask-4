import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const UrlComponent = () => {
  const [url, setUrl] = useState("");

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleClick = () => {
    if (url.length === 0 || !validURL(url)) {
      alert("Input url is not valid");
      return;
    }

    let data = {
      url,
    };
    //console.log("data" + data);
    axios({
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://url-validation-django.herokuapp.com/",
    })
      .then((result) => {
        // let x = result.config.data.split(":");

        // let finalurl = x[1] + ":" + x[2];

        // if (finalurl.length === 13) alert("Invalid URL");
        // else alert(result.data);

        alert(result.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form>
      <div>
        <h1>
          <label for="url">Enter a Source </label>
        </h1>

        <TextField
          id="url"
          label="URL"
          variant="filled"
          type="url"
          placeholder="https://example.com"
          pattern="https://.*"
          fullWidth
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          sx={{ m: 10, width: "60ch", top: "-30px", backgroundColor: "white" }}
          required
        />
      </div>
      <div>
        <Button
          style={{
            top: "-48px",
          }}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UrlComponent;
