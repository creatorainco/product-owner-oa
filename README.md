# Product Owner OA Challenge - Frontend + AI Tools

Welcome to the Creatorain frontend challenge! This project is designed to assess your ability to use AI tools to rapidly iterate on frontend experiences and improve usability.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd creatotest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the Campaign Page**
   Open your browser and navigate to:
   ```
   http://localhost:3000/campaign
   ```

## 🎯 Challenge Requirements

You'll be improving the Campaign page located at `/campaign`. Your task is to enhance the UI/UX using AI tools (Cursor, Claude Code, or GitHub Copilot) based on these criteria:

### 1. Material Design Integration
- Current state: Barebones skeleton using basic Material UI
- Goal: Implement Google Material Design 3 principles
- Reference: https://m3.material.io/
- Focus on: Visual alignment, accessibility, and user-friendliness

### 2. Keyword Display Redesign
- Current state: Simple chip display showing hashtags
- Goal: Create a more intuitive, user-friendly interface
- Suggestions: Collapsed "Advanced" section, better tag organization, visual hierarchy

### 3. Influencer Cards Revamp
- Current state: Basic table format with raw data
- Goal: Human-centered design that doesn't feel data-heavy
- Ideas: Visual cards, placeholder images, short bios, social media tags, engagement metrics visualization

### 4. Bonus Feature (Your Innovation)
- Add one new feature based on your product instincts
- Consider: Advanced filtering, saved searches, influencer comparison, export functionality, or any other usability enhancement

## 📁 Project Structure

```
creatotest/
├── src/
│   ├── app/
│   │   └── campaign/
│   │       └── page.tsx        # Main campaign page to improve
│   ├── components/
│   │   └── search/
│   │       └── InfluencerTable.tsx  # Influencer display component
│   └── contexts/
│       └── Material3ThemeProvider.tsx  # Material Design theme
└── public/
```

## 🛠️ Tech Stack
- Next.js 14
- React 18
- TypeScript
- Material UI (MUI)
- Tailwind CSS (available but optional)

## 💡 Tips for Success

1. **Use AI Tools Effectively**: Leverage Cursor, Claude Code, or GitHub Copilot to speed up your development
2. **Focus on User Experience**: Think about how real users would interact with this influencer discovery tool
3. **Material Design 3**: Study the design system and implement its principles consistently
4. **Mobile Responsiveness**: Ensure your design works well on different screen sizes
5. **Performance**: Keep the interface snappy and responsive

## 📸 Submission

Once you've completed your improvements:

1. Take clear screenshots of your enhanced UI
2. Include screenshots showing:
   - Overall campaign page view
   - Keyword management interface
   - Influencer cards/display
   - Your bonus feature
   - Mobile responsive views (if applicable)

3. Email your screenshots to the provided address and CC: ray@creatorain.com

## 🤔 Current Features

The campaign page currently includes:
- Keyword management (add, remove, toggle active/inactive)
- Influencer search results
- Basic filtering based on keywords
- Refresh functionality
- Result count adjustment

Your job is to make these features more intuitive, visually appealing, and user-friendly!

## 🎨 Design Inspiration

Consider looking at:
- Influencer marketing platforms (AspireIQ, CreatorIQ, Klear)
- Social media analytics tools
- Modern SaaS dashboards
- Material Design 3 showcase examples

Good luck! We're excited to see your creative solutions and how you leverage AI tools to enhance the user experience.