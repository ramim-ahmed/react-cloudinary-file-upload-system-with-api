import { useState } from "react";

export default function UploadWidget() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cken0rmd");
    data.append("cloud_name", "dc68241xz");

    try {
      if (image === null) {
        return alert("pleas upload image");
      }

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dc68241xz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      setUrl(cloudData.url);
      console.log(cloudData.url);
      alert("upload success");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(url);
  return (
    <div className="flex justify-center items-center h-screen ">
      {/* Image Upload Section  */}
      <div className=" bg-[#2C3A47] p-10 rounded-xl">
        {/* Upload Input And Image Section  */}
        <div className="input flex justify-center mb-5">
          <label htmlFor="file-upload" className="custom-file-upload">
            {image ? (
              <img
                className=" w-72 lg:w-96  rounded-xl"
                src={image ? URL.createObjectURL(image) : ""}
                alt="img"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                className="h-20 w-20"
              />
            )}
          </label>

          {/* Image Upload Input */}
          <input
            id="file-upload"
            onChange={(e) => setImage(e.target.files[0])}
            className=" text-white"
            type="file"
          />
        </div>

        {/* Send Button  */}
        <div className="">
          <button
            onClick={() => saveImage()}
            className=" w-72 lg:w-96 p-3  bg-[#FC427B]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
