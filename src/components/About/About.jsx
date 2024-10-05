import React from "react";

const About = () => {
  return (
    <div className="flex-1 min-h-screen pb-28 relative bg-background text-text p-8">
      <h1 className="text-4xl font-bold mb-6">About Stellar</h1>
      <p className="mb-4">
        Stellar is an AI-powered chat application that leverages the power of
        Gemini to provide intelligent responses to your queries.
      </p>
      <p className="mb-4">
        Our mission is to make AI accessible and helpful for everyone, providing
        a user-friendly interface for engaging with advanced language models.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features:</h2>
      <ul className="list-disc list-inside">
        <li>Intelligent conversations powered by Gemini generative AI</li>
        <li>Customizable themes to suit your preferences</li>
        <li>Ability to manage multiple conversations</li>
      </ul>
      <p className="mt-8">
        Thank you for using Stellar. This is my practice project to learn
        integration of API's and also to understand TailwindCSS (which I did not
        thought to be this simple) better.
      </p>
    </div>
  );
};

export default About;
