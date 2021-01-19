/**
 * Project hosted on the server
 */
export default interface Project {
  /**
   * Project name
   */
  name: string,
  /**
   * Project status
   *
   * true - is available
   * false - is not avaliable
   */
  status: boolean,
}
