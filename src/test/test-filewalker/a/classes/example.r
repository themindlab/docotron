"
docotron: function
name: addSignificance
args.sf: data frame of analysed results with ymin/ymax columns added. No default.
args.client_stim: vector of stimuli to calculate significance for. First item will be used as comparison. No default.
returns: data frame with the significance attached
"

#' Add a 'sig' column to a results data frame based on error.
#' @function addSignificance
#' @param sf data frame of analysed results with ymin/ymax columns added. No default.
#' @param client_stim vector of stimuli to calculate significance for. First item will be used as comparison.
#'  No default.
#' @export
addSignificance <- function(sf, client_stim){
  
  sig_max <- sf$ymax[sf$x==client_stim[1]]
  sig_min <- sf$ymin[sf$x==client_stim[1]]
  
  sf[,"sig"] <- NA
  for(stim in client_stim[-1]){
    if(sf[sf$x==stim, "ymin"] > sig_max){
      sf[sf$x==stim, "sig"] <- "higher"
    }
    if(sf[sf$x==stim, "ymax"] < sig_min){
      sf[sf$x==stim, "sig"] <- "lower"
    }
  }
  
  return(sf)
  
}