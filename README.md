# CHATPDF

https://github.com/Sijibomii/chatpdf/assets/73986352/b7d25cb8-ef60-4830-a9f3-c8a1672e4e07


## Overview

This project is designed to provide a seamless chat experience where users can upload PDF files, create chats around them, and interact with an AI assistant. The AI assistant uses the OpenAI API to generate responses based on the chat context.

## Technologies and Frameworks

- Next.js
- TypeScript
- Tailwind CSS
- Hanko
- Supabase
- Google Cloud Storage
- OpenAI API
- Pinecone
- OpenAI Edge
- @tanstack/react-query
- tailwind-merge

## Installation

Follow the steps below to install and setup the project:

1. **Clone the repository**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/Sijibomii/chatpdf.git
   ```
2. **Navigate to the project directory**

   ```bash
   cd chatpdf
   ```

3. **Install Node.js**

   The project requires Node.js version 13.4.19 or later. You can download it from [here](https://nodejs.org/en/download/).

4. **Install the required dependencies**

   Run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

   This will install all the dependencies listed in the `package.json` file, including Next.js, React, React DOM, Tailwind CSS, and other specific dependencies such as "@google-cloud/storage" and "@teamhanko/hanko-elements".

5. **Register and setup your hanko**

    open [https://cloud.hanko.io/](https://cloud.hanko.io/) to setup your hanko profile

6. **Setup environment variables**

    Create a `.env` file in the root directory of your project and add the required environment variables similar to env.example.

7. **Run the project**

    Now, you can run the project using the following command:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



