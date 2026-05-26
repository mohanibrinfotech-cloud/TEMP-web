export default async function handler(req, res) {
  try {
    const repo = "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME";

    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=5`
    );

    const data = await response.json();

    const commits = data.map((item) => ({
      message: item.commit.message,
      date: item.commit.author.date,
      url: item.html_url,
    }));

    res.status(200).json({
      success: true,
      commits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch commits",
    });
  }
}