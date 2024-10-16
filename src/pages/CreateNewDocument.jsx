import { Input } from '@/components/ui/input';
import { UserButton, useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LogoIcon from '@/assets/icons/Logo5.jpg';
import { FaArrowCircleRight } from 'react-icons/fa';
import { Textarea } from '@/components/ui/textarea';
import 'firebase/compat/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import { Button } from '@/components/ui/button';
import { doc, setDoc } from 'firebase/firestore';
import uuid4 from 'uuid4';

const paragraph =
  'Effective note-making is a crucial skill for enhancing learning and retention. By summarizing key points, using bullet lists, and incorporating visuals, individuals can create organized and engaging notes. Regular review and personalization of note-taking methods cater to unique learning styles, fostering deeper understanding and improving overall academic performance.';

const CreateNewDocument = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [title, settitle] = useState('');
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadedfileName, setUploadedfileName] = useState(null);
  const [uploadfileData, setUploadfileData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id.toString());
  }, []);

  // Handle radio button change
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-10 h-10',
      userButtonPopoverCard: 'bg-blue-100',
      userButtonPopoverActionButton: 'text-black-600',
    },
  };

  const uploadFile = async (file) => {
    if(file == null)
      return  { fileUrl, uploadedfileName };
    try {
      setLoading(true);
      const storageRef = ref(storage, `uploads/${file.name}`); 
  
      const snapshot = await uploadBytes(storageRef, file); 
      console.log('Uploaded a blob or file!', snapshot);
  
      const fileSnap = snapshot.metadata.fullPath.split("/")[1];
      const uploadedfileName = fileSnap.toString();  
      console.log(uploadedfileName);
  
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);  
  
      setFileUrl(downloadURL);
      setUploadedfileName(uploadedfileName);
      setLoading(false);
  
      return { downloadURL, uploadedfileName };  
    } catch (error) {
      setLoading(false);
      console.error('Error uploading file:', error);
      throw error;  
    }
  };
  

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadfileData(file);
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      // Await the uploadFile function to complete and get the download URL and file name
      const { downloadURL, uploadedfileName } = await uploadFile(uploadfileData);
  
      const docId = uuid4();
      await setDoc(doc(db, 'workspaceDocument', docId.toString()), {
        workspaceId: id.toString(),
        documentId: docId.toString(),
        title: title.toLowerCase(),
        description: description,
        downloadURL: downloadURL || "",  
        createdOn: new Date().toLocaleDateString(),
        priority: priority.toLowerCase(),
        createdBy: user?.fullName,
        uploadedfileName: uploadedfileName || null,  
      });
  
      setLoading(false);
      navigate('/workspace/' + id); 
    } catch (error) {
      setLoading(false);
      console.error('Error In Create New Document Page :: ', error);
    }
  };
  

  return (
    <>
      {/* Note Navbar */}
      <div className="fixed top-0 left-0 right-0 shadow-md flex justify-between items-center w-full h-[70px] p-5 bg-[#070f20] z-50">
        <Link to="/">
          <img src={LogoIcon} alt="Keep Notes" height={100} width={200} />
        </Link>
        <div className="flex justify-center items-center gap-3">
          <UserButton appearance={userButtonAppearance} />
          <h1 className="text-white">{user?.fullName}</h1>
        </div>
      </div>

      {/* Content Below Navbar */}
      <div className="mt-[70px]">
        {/* Note Form */}
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <div className="flex center items-center justify-center border-2 w-[90%] h-[70%] md:w-[70%] lg:w-[60%] shadow-2xl rounded-lg">
            <section className="bg-gray-100 w-full">
              <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                  <div className="lg:col-span-2 lg:py-12 flex flex-col gap-5 items-center">
                    <div className="flex justify-start w-full">
                      <img
                        src={LogoIcon}
                        alt="Keep Notes"
                        height={100}
                        width={200}
                      />
                    </div>
                    <p className="max-w-xl text-lg text-[#070f20] ">
                      {paragraph}
                    </p>
                    <div className="flex justify-start w-full">
                      <FaArrowCircleRight className="text-5xl" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form className="space-y-4" onSubmit={handleCreateDocument}>
                      <div>
                        <label className="sr-only" htmlFor="title">
                          Title
                        </label>
                        <Input
                          className="w-full rounded-lg border-gray-300 p-3 text-sm"
                          placeholder="Title"
                          type="text"
                          id="title"
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                        {/* High Priority */}
                        <div>
                          <label
                            htmlFor="High"
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                            tabIndex="0"
                          >
                            <input
                              className="sr-only"
                              id="High"
                              type="radio"
                              name="priority"
                              value="High"
                              onChange={handlePriorityChange}
                            />
                            <span className="text-sm">High</span>
                          </label>
                        </div>

                        {/* Low Priority */}
                        <div>
                          <label
                            htmlFor="Low"
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                            tabIndex="0"
                          >
                            <input
                              className="sr-only"
                              id="Low"
                              type="radio"
                              name="priority"
                              value="Low"
                              onChange={handlePriorityChange}
                            />
                            <span className="text-sm">Low</span>
                          </label>
                        </div>

                        {/* Medium Priority */}
                        <div>
                          <label
                            htmlFor="Medium"
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                            tabIndex="0"
                          >
                            <input
                              className="sr-only"
                              id="Medium"
                              type="radio"
                              name="priority"
                              value="Medium"
                              onChange={handlePriorityChange}
                            />
                            <span className="text-sm">Medium</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="message">
                          Description
                        </label>
                        <Textarea
                          className="w-full rounded-lg border-gray-200 p-3 text-sm resize-none"
                          placeholder="Write here"
                          rows="5"
                          id="message"
                          onChange={(e) => setDescription(e.target.value)}
                        ></Textarea>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700"
                          htmlFor="attachment"
                        >
                          Add Attachment
                        </label>
                        <input
                          type="file"
                          id="attachment"
                          className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
                          accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                          onChange={handleUploadFile}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Upload your file (Images, PDFs, Documents)
                        </p>
                      </div>

                      <div className="mt-4">
                        <Button
                          type="submit"
                          className=" w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                          disabled={loading}
                        >
                          {loading ? 'Creating...' : 'Create Notes'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewDocument;
