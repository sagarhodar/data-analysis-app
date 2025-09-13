
## Installation and Local Development

To get this project up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/data-analysis-app.git
    cd data-analysis-app
    ```
    (Replace `your-username` with your actual GitHub username and `data-analysis-app` with your repository name if different)

2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use Yarn
    # yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will start the Vite development server, usually at `http://localhost:5173`. The application will automatically open in your browser.

## Build for Production

To create an optimized production build of the application:

1.  **Run the build command:**
    ```bash
    npm run build
    # or
    # yarn build
    ```
    This will compile and optimize your application files into the `dist/` directory.

2.  **Preview the production build (optional):**
    You can serve the production build locally to test it before deployment:
    ```bash
    npm run preview
    # or
    # yarn preview
    ```
    This will typically serve the `dist/` folder on a local server.

## Usage

1.  **Upload Files:** On the home page, use the "Upload Data 1 (CSV)" and "Upload Data 2 (CSV)" inputs to select your CSV files.
2.  **Preview Data:** After uploading, you'll see a preview of both datasets. Click "Continue to Mapping".
3.  **Map Columns:** Select a "Key Column" from Data 1 and Data 2 that should be used to uniquely identify and match records between the two files. Click "Confirm Key Columns".
4.  **View Analysis Results:** The application will then display three tables:
    *   Records unique to Data 1.
    *   Records unique to Data 2.
    *   Records matched in both datasets.
    Each table has options to download its content as a CSV or apply further filters.
5.  **Further Filter:** Click "Further Filter" on any analysis result table to open a dedicated filtering interface. Apply filters based on column, type (equals, contains, range), and value. Download the filtered results or go "Back to Main Analysis".
6.  **Start New Analysis:** Click "Start New Analysis" to reset the application and upload new files.

## Contributing

Feel free to fork the repository, open issues, or submit pull requests.

## License

This project is licensed under the ISC License.

## Contact

Sagar Hodar
Email: hodarsagar@gmail.com
