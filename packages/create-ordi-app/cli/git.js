import cp from 'node:child_process';

export default class Git {
  cwd = '';

  template = '';

  constructor(cwd, template) {
    this.cwd = cwd;
    this.template = template;
  }

  /**
   * Meant to create an empty Git repository to ordi application,
   * basically a .git directory with subdirectories for objects, refs/heads, refs/tags, and template files.
   * Running this method in an existing repository is safe. It will not overwrite things that are already there.
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitInit(options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync('git init', options);
  }

  /**
   * Add a remote named <name> for the ordi application directory at <URL>. The command git fetch <name>
   * can then be used to create and update remote-tracking branches <name>/<branch>.
   * @param {string} origin
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitRemoteAddOrigin(remote = 'tokopedia/ordi-web-framework', options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync(`git remote add origin git@github.com:${remote}.git`, options);
  }

  /**
   * Download necessary objects and refs from ordi repository. We only care
   * branches and limit fetching to the most current commits from the tip of each remote branch history
   * in order to avoid process slowing down caused by unnecessary transactions.
   * @param {string} branch
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitFetchOrigin(branch = 'master', options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync(`git fetch origin ${branch} --no-tags --depth=1`, options);
  }

  /**
   * This command is used to create sparse checkouts, which change the working tree from having all tracked files
   * present to only having a subset of those files. This is necessary to avoid
   * bring down all files in `ordi-web-framework` repository.
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitSparseCheckoutInit(options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync('git sparse-checkout init', options);
  }

  /**
   * Disable the sparse-checkout config setting, and restore the working directory to include all files
   * in order to make the installation clean.
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitSparseCheckoutDisable(options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync('git sparse-checkout disable', options);
  }

  /**
   * Populate the `sparse-checkout` file from the list of `folders` following the set subcommand,
   * and update the working directory to match.
   * @param {string[]} folders
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitSparseCheckoutSet(folders = [], options = { cwd: this.cwd, stdio: 'ignore' }) {
    const dirs = folders.join(' ').trim();
    cp.execSync(`git sparse-checkout set --no-cone ${dirs}`, options);
  }

  /**
   * @param {string} branch
   * @param {import('node:child_process').CommonExecOptions} options
   */
  gitCheckout(branch = 'master', options = { cwd: this.cwd, stdio: 'ignore' }) {
    cp.execSync(`git checkout ${branch}`, options);
  }

  /**
   * Check the given `this.template` availability in remote `ordi-web-framework` repository
   * inside `examples/*` directories. `grep` will exit with non-zero status if it is failed
   * to find the match pattern.
   * @param {string} origin
   * @param {import('node:child_process').CommonExecOptions} options
   * @returns {void}
   */
  checkRemoteExampleFolders(origin = 'master', options = { cwd: this.cwd }) {
    cp.execSync(`git ls-tree -d origin/${origin}:examples | grep ${this.template}`, options);
  }

  /**
   * List the availablity `with-*` in `examples/*`. Return the list directories of `examples/*`.
   * @param {string} origin
   * @param {import('node:child_process').CommonExecOptions} options
   * @returns {string}
   */
  listRemoteExampleFolders(origin = 'master', options = { cwd: this.cwd }) {
    return cp.execSync(`git ls-tree --name-only origin/${origin}:examples | grep with-`, options);
  }
}
