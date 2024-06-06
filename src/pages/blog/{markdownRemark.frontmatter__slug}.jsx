import * as React from "react"
import { graphql } from "gatsby"
import "../styles/styles.css"

export default function BlogPostsTemplate({ data }) {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  // Group posts by slug
  const groupedPosts = posts.reduce((acc, post) => {
    const slug = post.frontmatter.slug
    if (!acc[slug]) {
      acc[slug] = { questions: null, answers: [] }
    }
    if (post.frontmatter.questions) {
      acc[slug].questions = post
    } else {
      acc[slug].answers.push(post)
    }
    return acc
  }, {})

  // Parse the HTML content to separate answers
  // const parseAnswers = (html) => {
  //   const parsedAnswers = {}
  //   const parser = new DOMParser()
  //   const doc = parser.parseFromString(html, 'text/html')
  //   const headings = doc.querySelectorAll('h3')
  //   headings.forEach((heading, index) => {
  //     let nextElement = heading.nextElementSibling
  //     let answerHTML = ''
  //     while (nextElement && nextElement.tagName !== 'H3') {
  //       answerHTML += nextElement.outerHTML
  //       nextElement = nextElement.nextElementSibling
  //     }
  //     parsedAnswers[`Question ${index + 1}`] = answerHTML
  //   })
  //   return parsedAnswers
  // }

  return (
    <div>
      {Object.keys(groupedPosts).map(slug => {
        const { questions, answers } = groupedPosts[slug]
        if (!questions) return null
        const { frontmatter, html } = questions
        return (
          <div key={questions.id}>
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {frontmatter.questions && (
              <div>
                <h3>Questions</h3>
                <ul>
                  {frontmatter.questions.map((question, index) => (
                    <li key={index}>
                      <p>{question}</p>
                      {answers.map(answer => {
                        const parsedAnswers = answer.html
                        return (
                          <div key={answer.id}>
                            <strong>{answer.frontmatter.name}:</strong>
                            <div dangerouslySetInnerHTML={{ __html: parsedAnswers[`Question ${index + 1}`] }} />
                          </div>
                        )
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            questions
            name
          }
        }
      }
    }
  }
`
