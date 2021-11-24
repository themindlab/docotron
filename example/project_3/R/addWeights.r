"
docotron: function
name: addWeights
args[context]: context frame, which will contain the columns which you wish to weight the data on. No default.
args[df]: data.frame you want to add weights too. No default.
args[colnames]: the name of the columns in the context you wish to produce weights for, they need to have the same name as the column in the context frame.
args[...]: the vectors containing the ideal proportions of each category, for example, gender = c(0.5, 0.5) or age = c(0.25, 0.5, 0.25). No default.
returns: data frame with the weights added
"


#' Add weights to context and data frame
#' 
#' @param context context frame, which will contain the columns which you wish to weight the data on. No default.
#' @param df data.frame you want to add weights too. No default.
#' @param colnames the name of the columns in the context you wish to produce weights for, they need to have the same name as the column in the context frame.
#' for example, colnames = c("gender", "age_groups"). No default.
#' @param ... the vectors containing the ideal proportions of each category, for example, gender = c(0.5, 0.5) or age = c(0.25, 0.5, 0.25). No default.
#' @export
addWeights <- function(context, df, colnames, ...){
  
  x <- list(...)
  
  context <- context[,c("session_id", colnames)]
  
  # Create vector which contains the ideal proportions for each split
  t <- as.matrix(expand.grid(x))
  
  L <- c()
  rows <- asplit(t,1)
  for( i in 1:length(rows)){
    L[i] <- prod(rows[[i]])
  }
  
  df2 <- context[context$session_id %in% unique(df$session_id),]
  
  # Create weight frame
  weights <- df2 %>%
    group_by_at(colnames) %>%
    summarise(n = n())
  
  L <- L*sum(weights$n)
  weights$n_want <- L
  weights$weight <- weights$n_want/weights$n
  
  # Attach weights to the context and data frame
  df3 <- merge(df2, weights, by = colnames)[,c("session_id","weight", "n_want", "n", colnames)]
  return(merge(df, df3, by = "session_id"))
  
}






