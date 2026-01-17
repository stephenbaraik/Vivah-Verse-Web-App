export interface BlogPostData {
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPostData[] = [
  {
    slug: 'stress-free-wedding-planning',
    title: '5 Secrets to Stress-Free Wedding Planning',
    author: 'Tanisha Ghosh',
    date: '2026-01-17',
    image: 'https://images.unsplash.com/photo-1595995839233-55e229f63385',
    excerpt: 'Planning a wedding should be a joyous experience, not a stressful one. Here are our top 5 secrets to planning your big day without the chaos.',
    content: `
      <h2>1. Hire a Wedding Planner</h2>
      <p>The most effective way to reduce stress is to hire a professional wedding planner. A good planner will handle all the details, from vendor coordination to timeline management, allowing you to focus on enjoying the process.</p>
      
      <h2>2. Set a Realistic Budget</h2>
      <p>Financial stress is one of the biggest contributors to wedding planning anxiety. By setting a realistic budget from the start, you can make informed decisions and avoid overspending.</p>
      
      <h2>3. Trust Your Vendors</h2>
      <p>Once you've chosen your vendors, trust them to do their job. Micromanaging your photographer, caterer, and florist will only add to your stress levels.</p>
      
      <h2>4. Delegate Tasks</h2>
      <p>Don't be afraid to ask for help. Delegate smaller tasks to your family and friends, such as assembling wedding favors or addressing invitations.</p>
      
      <h2>5. Take Time for Yourselves</h2>
      <p>It's important to take breaks from wedding planning and spend quality time together as a couple. Remember why you're getting married in the first place!</p>
    `,
  },
  {
    slug: 'choosing-the-perfect-venue',
    title: 'How to Choose the Perfect Wedding Venue',
    author: 'Sneha Das',
    date: '2026-01-15',
    image: 'https://images.unsplash.com/photo-1523049563911-295b3f23104a',
    excerpt: 'Your wedding venue sets the tone for your entire celebration. Here are some tips to help you choose the perfect one.',
    content: `
      <h2>1. Consider Your Guest List</h2>
      <p>The size of your guest list will be a major factor in determining your choice of venue. Make sure the venue can comfortably accommodate all of your guests.</p>
      
      <h2>2. Think About Your Theme</h2>
      <p>The venue should complement your wedding theme. If you're planning a rustic wedding, a barn or a vineyard would be a great choice. For a more formal affair, a ballroom or a historic mansion would be more appropriate.</p>
      
      <h2>3. Check for Availability</h2>
      <p>Popular wedding venues can get booked up months or even years in advance. As soon as you have a date in mind, start contacting venues to check for availability.</p>
      
      <h2>4. Visit in Person</h2>
      <p>It's essential to visit potential venues in person before making a final decision. This will give you a better sense of the space and help you visualize your wedding day.</p>
    `,
  },
];

