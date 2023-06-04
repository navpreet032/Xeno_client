import { useContext, useState } from "react";
import "./newProduct.css";
import { MovieContext } from "../../context/moviecontext/MovieContext";
import storage from "../../firebase";
import {  getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import { createMovie } from "../../context/moviecontext/apiCalls";
//3:40:00
export default function NewProduct() {
  const [movie, setMovie]=useState({});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange=(e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }

  const upload=(items)=>{
    items.forEach(item => {
      
      const filename = item.file.name;
      const storageRef = ref(storage,`/items/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);// func to upload item

      uploadTask.on("state_changed",(snapshot)=>{
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
 
        console.log(progress);
      },(err) => console.log(err),

      ()=>{ getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        
        setMovie((prev) => {
          return { ...prev, [item.label]: url };
        });
        console.log("movie = ",movie)
        setUploaded((prev) => prev + 1);
      });
    });
    
    });
  }

  const handleUpload=(e)=>{
    e.preventDefault();
    
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
 
  }

  const handleCreate=(e)=>{
    e.preventDefault();
    createMovie(movie, dispatch);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleCreate} >
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

// array of objects 'objects will be the files which are needed to be uploaded "name is according to the name in the modals"' 
// function to upload all files to firebase;
//copies obj 1 to obj 2
//                             `/items/${item.file.name}` : items is folder and ${item.file.name} is to get file name : ex /items/car.mp3