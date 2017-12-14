const ortools = require('node_or_tools');

/**
 * WARNING: This method is called in another Thread !!!
 * Find the best routing option to visit once all nodes while taking into account the distance of arcs
 * @param {*Options for Travel salesman problem} options
 * @param {*2 Dimensional Array as a matrix of costs} nodes
 */
const TSP = function (options, nodes) {
  if (!nodes || nodes.length < 1) {
    throw new Error('Parameters are required');
  }

  // Control that options are available
  if (!options.solverOpts || !options.searchOpts) {
    throw new Error('Options are required for TSP solving');
  }

  return new Promise(function (resolve, reject) {
    const Problem = new ortools.TSP(options.solverOpts);
    return Problem.Solve(options.searchOpts, function (err, solution) {
      if (err) {
        reject({ error: err });
      }
      resolve(solution);
    });
  });
};

const VRP = function (options, nodes) {

};


module.exports = {
  TSP: TSP,
  VRP: VRP
}
;
