'use client'

import React from 'react';
import { AvatarButton } from '@/components/ui';
import { Input } from '@/components';
import { Button, useToast from 'lucide-react';

export default function CreateEntityForm() {
  const toast = useToast();

  const [values, setValues] = React.useState({
    name: '',
    description: '',
    sku: '',
    price: 0,
    image: '',
    brand: '',
    status: 'active',
  });
  const [errors, setErrors] = React.useState({
    name: '',
    description: '',
    sku: '',
    price: '',
   : '',
    brand: '',
    status: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const createEntity = async () => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ message: '✓ Entity created successfully!' });
        }, 1000);
      });
      setSubmitted(true);
      toast.message('✓ Entity created successfully!', 'success', 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleError = (error: string, name: string) => {
    setErrors({ ...errors, [name]: error });
  };

  const handleReset = () => {
    setValues({
      name: '',
      description: '',
      sku: '',
      price: 0,
      image: '',
      brand: '',
      status: 'active',
    });
    setErrors({
      name: '',
      description: '',
      sku: '',
      price: '',
      image: '',
      brand: '',
      status: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="max-w-md shadow-md p-10 bg-white rounded-lg border border-zinc-200">
      <h2 className="text-zinc-900 tracking-tight font-bold text-3xl mb-4">
        Create Entity
      </h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        createEntity();
      }}>
        <div className="flex flex-wrap -mx-3 mb-6">
          {Object.keys(values).map((key, index) => (
            <div key={index} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-lg text-zinc-600 mb-4">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <Input
                type={typeof values[key] === 'number' ? 'number' : 'text'}
                name={key}
                value={values[key]}
                onChange={(event) => handleChange(event)}
                error={errors[key] ? errors[key] : ''}
              />
            </div>
          ))}
        </div>
        {errors.name && errors.name !== '' && (
          <p className="text-red-600 text-sm italic mb-4">{errors.name}</p>
        )}
        <Button
          type="submit"
          className="bg-zinc-900 text-white hover:bg-zinc-700 mb-4"
        >
          Create Entity
        </Button>
        <Button
          onClick={handleReset}
          className="bg-zinc-900 text-white hover:bg-zinc-700"
        >
          Reset
        </Button>
        <p className="text-emerald-600 text-sm italic mb-4">
          {submitted && '✓ Entity created successfully!'}
        </p>
      </form>
    </div>
  );
}