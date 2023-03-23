import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useDropzone} from 'react-dropzone'; // npm i react-dropzone
import {ThirdwebStorage} from '@thirdweb-dev/storage'; //npm install @thirdweb-dev/storage
import {useNavigate} from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  justify-content: center;
  height: calc(100vh - 100px); /* 브라우저 높이 - 400px */
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 400px;
  margin-top: 16px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 24px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Dropzone = ({onDrop, image}) => {
  const onDropCallback = useCallback(
    acceptedFiles => {
      onDrop(acceptedFiles);
    },
    [onDrop],
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: onDropCallback,
    accept: 'image/*',
  });

  return (
    <Wrapper {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {image ? (
        <ImagePreview src={URL.createObjectURL(image)} alt="Preview" />
      ) : (
        <p>Drop your image here</p>
      )}
    </Wrapper>
  );
};

const Form = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({name, description});
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" value={name} onChange={handleNameChange} required />

      <Label htmlFor="description">Description</Label>
      <Textarea id="description" value={description} onChange={handleDescriptionChange} required />

      <button type="submit">Mint NFT</button>
    </form>
  );
};

const MintPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const storage = new ThirdwebStorage();
  const navigate = useNavigate();

  async function uploadFile(file) {
    if (Array.isArray(file)) {
      return file.map(uploadFile);
    } else {
      const uri = await storage.upload(file);
      console.log('storage resolve', storage.resolveScheme(uri));
      return storage.resolveScheme(uri);
    }
  }

  const handleDrop = useCallback(acceptedFiles => {
    setImageFile(acceptedFiles[0]);
  }, []);

  const onSubmit = async data => {
    const {name, description} = data;
    const tokenurl = await uploadFile(imageFile);

    console.log('data', data);
    try {
      const response = await axios.post(
        'http://localhost:5500/nft/minting',
        {name, description, tokenurl},
        {
          withCredentials: true,
        },
      );
      console.log('resoponse.data', response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Dropzone onDrop={handleDrop} image={imageFile} />
      <Form onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default MintPage;
