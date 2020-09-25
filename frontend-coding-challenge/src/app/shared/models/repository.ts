export interface Repository {
    name: string;
    stargazers_count: number;
    open_issues: number;
    description: string;
    html_url: string;
    created_at: Date;
    owner: {
      avatar_url: string;
      login: string;
      html_url: string;
    };
}
