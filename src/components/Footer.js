import React from 'react'

import Link from '../components/Link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer has-background-dark has-text-light has-text-centered">
      <small>
        <p>
          Handcrafted with <i className="e1a-heart" /> by myself. Copyright
          &copy; {currentYear}. <br />
          Made with <Link href="https://bulma.io">Bulma</Link> and{' '}
          <Link href="https://gatsbyjs.org">GatsbyJS</Link>.
        </p>
        <br />
        <p>
          Hosted on <Link href="https://zeit.co/now">ZEIT Now</Link>. Source
          available on{' '}
          <Link href="https://github.com/grikomsn/landing-page">GitHub</Link>.
        </p>
      </small>
    </footer>
  )
}

export default Footer
